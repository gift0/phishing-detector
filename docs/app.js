// docs/app.js - FINAL WORKING VERSION

// ========================================
// Feature Extraction (must match Python)
// ========================================
function extractFeatures(url) {
    try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.toLowerCase();
        let path = urlObj.pathname;
        const query = urlObj.search;
        
        // ✅ FIX: Python treats "/" as empty path (length 0)
        // Remove leading slash to match Python's behavior
        if (path === '/') {
            path = '';
        } else if (path.startsWith('/')) {
            path = path.substring(1);
        }
        
        // Count special characters
        const specialCharsRegex = /[@_!$%^&*(){}[\]|\\:;"'<>,?~`+=]/g;
        const specialChars = (url.match(specialCharsRegex) || []).length;
        
        // Check for IP address in hostname
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const containsIp = ipRegex.test(host) ? 1 : 0;
        
        // Suspicious TLDs
        const suspiciousTlds = ['.zip', '.tk', '.xyz', '.top', '.club'];
        const hasSuspiciousTld = suspiciousTlds.some(tld => host.endsWith(tld)) ? 1 : 0;
        
        // Phishing keywords
        const phishKeywords = ['login', 'verify', 'update', 'bank', 'secure', 'account'];
        const hasPhishKeyword = phishKeywords.some(kw => url.toLowerCase().includes(kw)) ? 1 : 0;
        
        // Domain tokens (split by dots)
        const domainTokens = host.split('.').filter(t => t.length > 0).length;
        
        // Extract all features matching Python training
        const features = {
            url_length: url.length,
            hostname_length: host.length,
            path_length: path.length, // Now matches Python (0 for root)
            num_subdirs: path === '' ? 0 : (path.match(/\//g) || []).length, // 0 for empty path
            num_dots: (url.match(/\./g) || []).length,
            num_hyphens: (url.match(/-/g) || []).length,
            num_digits: (url.match(/\d/g) || []).length,
            num_special_chars: specialChars,
            at_symbol: url.includes('@') ? 1 : 0,
            double_slash_in_path: path.includes('//') ? 1 : 0,
            contains_ip: containsIp,
            has_https: url.startsWith('https') ? 1 : 0,
            https_in_domain: host.includes('https') ? 1 : 0,
            domain_tokens: domainTokens,
            long_domain: host.length > 30 ? 1 : 0,
            suspicious_tld: hasSuspiciousTld,
            phish_keywords: hasPhishKeyword,
            rule_suspicious_tld_and_keyword: (hasSuspiciousTld && hasPhishKeyword) ? 1 : 0,
            has_exe: url.toLowerCase().endsWith('.exe') ? 1 : 0,
            has_php: url.toLowerCase().includes('.php') ? 1 : 0,
            has_html: (url.toLowerCase().includes('.html') || url.toLowerCase().includes('.htm')) ? 1 : 0,
            path_to_host_ratio: host.length > 0 ? path.length / host.length : 0, // Now matches Python
            num_query_params: (query.match(/=/g) || []).length,
            num_fragments: (url.match(/#/g) || []).length
        };
        
        return features;
    } catch (error) {
        console.error('Feature extraction error:', error);
        return null;
    }
}

// ========================================
// Model Loading and Prediction
// ========================================
async function loadModel() {
    try {
        const response = await fetch("model.json");
        if (!response.ok) {
            throw new Error("Model file not found. Ensure model.json is in /docs/");
        }
        const modelData = await response.json();

        console.log("✅ Model loaded successfully");
        console.log("   Model type:", modelData.model_type);
        console.log("   Classes:", modelData.classes);
        console.log("   Features:", modelData.n_features);
        console.log("   Intercept:", modelData.intercept[0].toFixed(4));

        // ========================================
        // Helper function for clear button
        // ========================================
        function addClearButtonListener() {
            setTimeout(() => {
                const clearButton = document.getElementById("clearBtn");
                if (clearButton) {
                    clearButton.addEventListener("click", () => {
                        const urlInput = document.getElementById("urlInput");
                        const resultDiv = document.getElementById("result");
                        
                        // Clear the input field
                        urlInput.value = "";
                        
                        // Clear the result display
                        resultDiv.innerHTML = "";
                        resultDiv.style.padding = "0";
                        resultDiv.style.border = "none";
                        resultDiv.style.backgroundColor = "transparent";
                        resultDiv.style.boxShadow = "none";
                        
                        // Focus back on input field
                        urlInput.focus();
                        
                        console.log("✨ Cleared - Ready for new URL");
                    });
                }
            }, 100);
        }

        // ========================================
        // PREDICTION FUNCTION WITH SCALING
        // ========================================
        function predict(featureVector) {
            // Step 1: Apply StandardScaler normalization
            // Formula: (x - mean) / scale
            const scaledVector = featureVector.map((value, i) => {
                const mean = modelData.scaler_mean[i];
                const scale = modelData.scaler_scale[i];
                return (value - mean) / scale;
            });
            
            // Step 2: Calculate logistic regression score
            let score = modelData.intercept[0];
            
            for (let i = 0; i < scaledVector.length; i++) {
                score += scaledVector[i] * modelData.coefficients[0][i];
            }
            
            // Step 3: Apply sigmoid function to get probability
            const probability = 1 / (1 + Math.exp(-score));
            
            // Step 4: Return prediction (1 = phishing, 0 = safe)
            return {
                prediction: probability > 0.5 ? 1 : 0,
                probability: probability,
                confidence: Math.max(probability, 1 - probability) * 100
            };
        }

        // ========================================
        // Button Click Handler
        // ========================================
        document.getElementById("checkBtn").addEventListener("click", () => {
            const url = document.getElementById("urlInput").value.trim();
            const resultDiv = document.getElementById("result");

            // Validate input
            if (!url) {
                resultDiv.innerHTML = "⚠️ Please enter a URL.";
                resultDiv.style.color = "orange";
                resultDiv.style.backgroundColor = "#fff3cd";
                resultDiv.style.border = "2px solid #ffc107";
                resultDiv.style.padding = "15px";
                resultDiv.style.borderRadius = "8px";
                return;
            }

            // Add protocol if missing
            let fullUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // Check if it's an IP address (use http)
                if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
                    fullUrl = 'http://' + url;
                } else {
                    fullUrl = 'https://' + url;
                }
            }

            // Extract features
            const featureMap = extractFeatures(fullUrl);

            if (!featureMap) {
                resultDiv.innerHTML = "❌ Invalid URL format!";
                resultDiv.style.color = "red";
                resultDiv.style.backgroundColor = "#ffe5e5";
                resultDiv.style.border = "2px solid #ff4444";
                resultDiv.style.padding = "15px";
                resultDiv.style.borderRadius = "8px";
                return;
            }

            // Create feature vector in correct order
            const cols = modelData.feature_columns;
            const vector = cols.map(col => featureMap[col] ?? 0);

            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("URL:", fullUrl);
            console.log("Raw Features:", featureMap);
            console.log("Feature Vector:", vector);

            // ========================================
            // 🚨 Rule-based overrides for edge cases
            // ========================================
            
            // Rule 1: IP addresses are highly suspicious
            if (featureMap.contains_ip === 1) {
                resultDiv.innerHTML = `
                    <div style="font-size: 1.4em; font-weight: bold; margin-bottom: 12px;">
                        🚨 PHISHING DETECTED!
                    </div>
                    <div style="font-size: 1em; margin-bottom: 10px;">
                        This URL uses an IP address instead of a domain name.
                    </div>
                    <div style="font-size: 0.9em; color: #c92a2a; font-weight: 600;">
                        Confidence: 100.0% (Rule-based)
                    </div>
                    <div style="font-size: 0.85em; margin-top: 12px; margin-bottom: 15px; opacity: 0.8;">
                        ⚠️ Legitimate sites rarely use IP addresses
                    </div>
                    <button id="clearBtn" style="
                        background-color: #fff;
                        color: #c92a2a;
                        border: 2px solid #c92a2a;
                        padding: 10px 20px;
                        font-size: 1em;
                        font-weight: 600;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.backgroundColor='#c92a2a'; this.style.color='#fff';" 
                       onmouseout="this.style.backgroundColor='#fff'; this.style.color='#c92a2a';">
                        🔄 Check Another URL
                    </button>
                `;
                resultDiv.style.color = "#c92a2a";
                resultDiv.style.backgroundColor = "#ffe5e5";
                resultDiv.style.border = "3px solid #ff4444";
                resultDiv.style.padding = "20px";
                resultDiv.style.borderRadius = "10px";
                resultDiv.style.marginTop = "20px";
                resultDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                
                console.log("Prediction: PHISHING (IP address rule)");
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                
                // Add clear button listener
                addClearButtonListener();
                return;
            }
            
            // Rule 2: Suspicious TLD + keyword combination
            if (featureMap.rule_suspicious_tld_and_keyword === 1) {
                resultDiv.innerHTML = `
                    <div style="font-size: 1.4em; font-weight: bold; margin-bottom: 12px;">
                        🚨 PHISHING DETECTED!
                    </div>
                    <div style="font-size: 1em; margin-bottom: 10px;">
                        Suspicious domain extension (.tk, .xyz, etc.) with phishing keywords.
                    </div>
                    <div style="font-size: 0.9em; color: #c92a2a; font-weight: 600;">
                        Confidence: 100.0% (Rule-based)
                    </div>
                    <div style="font-size: 0.85em; margin-top: 12px; margin-bottom: 15px; opacity: 0.8;">
                        ⚠️ Do not enter personal information
                    </div>
                    <button id="clearBtn" style="
                        background-color: #fff;
                        color: #c92a2a;
                        border: 2px solid #c92a2a;
                        padding: 10px 20px;
                        font-size: 1em;
                        font-weight: 600;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.backgroundColor='#c92a2a'; this.style.color='#fff';" 
                       onmouseout="this.style.backgroundColor='#fff'; this.style.color='#c92a2a';">
                        🔄 Check Another URL
                    </button>
                `;
                resultDiv.style.color = "#c92a2a";
                resultDiv.style.backgroundColor = "#ffe5e5";
                resultDiv.style.border = "3px solid #ff4444";
                resultDiv.style.padding = "20px";
                resultDiv.style.borderRadius = "10px";
                resultDiv.style.marginTop = "20px";
                resultDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                
                console.log("Prediction: PHISHING (suspicious TLD + keyword rule)");
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                
                // Add clear button listener
                addClearButtonListener();
                return;
            }

            // Make prediction
            const result = predict(vector);

            console.log("Prediction:", result.prediction === 1 ? "PHISHING" : "SAFE");
            console.log("Phishing Probability:", (result.probability * 100).toFixed(2) + "%");
            console.log("Confidence:", result.confidence.toFixed(2) + "%");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

            // Display Results
            if (result.prediction === 1) {
                resultDiv.innerHTML = `
                    <div style="font-size: 1.4em; font-weight: bold; margin-bottom: 12px;">
                        🚨 PHISHING DETECTED!
                    </div>
                    <div style="font-size: 1em; margin-bottom: 10px;">
                        This URL shows characteristics of a phishing site.
                    </div>
                    <div style="font-size: 0.9em; color: #c92a2a; font-weight: 600;">
                        Confidence: ${result.confidence.toFixed(1)}%
                    </div>
                    <div style="font-size: 0.85em; margin-top: 12px; margin-bottom: 15px; opacity: 0.8;">
                        ⚠️ Do not enter personal information or credentials
                    </div>
                    <button id="clearBtn" style="
                        background-color: #fff;
                        color: #c92a2a;
                        border: 2px solid #c92a2a;
                        padding: 10px 20px;
                        font-size: 1em;
                        font-weight: 600;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.backgroundColor='#c92a2a'; this.style.color='#fff';" 
                       onmouseout="this.style.backgroundColor='#fff'; this.style.color='#c92a2a';">
                        🔄 Check Another URL
                    </button>
                `;
                resultDiv.style.color = "#c92a2a";
                resultDiv.style.backgroundColor = "#ffe5e5";
                resultDiv.style.border = "3px solid #ff4444";
            } else {
                resultDiv.innerHTML = `
                    <div style="font-size: 1.4em; font-weight: bold; margin-bottom: 12px;">
                        ✅ Safe Website
                    </div>
                    <div style="font-size: 1em; margin-bottom: 10px;">
                        This URL appears to be legitimate.
                    </div>
                    <div style="font-size: 0.9em; color: #2f9e44; font-weight: 600;">
                        Confidence: ${result.confidence.toFixed(1)}%
                    </div>
                    <div style="font-size: 0.85em; margin-top: 12px; margin-bottom: 15px; opacity: 0.8;">
                        ℹ️ Always verify the URL matches the expected site
                    </div>
                    <button id="clearBtn" style="
                        background-color: #fff;
                        color: #2f9e44;
                        border: 2px solid #2f9e44;
                        padding: 10px 20px;
                        font-size: 1em;
                        font-weight: 600;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.backgroundColor='#2f9e44'; this.style.color='#fff';" 
                       onmouseout="this.style.backgroundColor='#fff'; this.style.color='#2f9e44';">
                        🔄 Check Another URL
                    </button>
                `;
                resultDiv.style.color = "#2f9e44";
                resultDiv.style.backgroundColor = "#e7f5e7";
                resultDiv.style.border = "3px solid #44aa44";
            }
            
            resultDiv.style.padding = "20px";
            resultDiv.style.borderRadius = "10px";
            resultDiv.style.marginTop = "20px";
            resultDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            
            // Add event listener to the clear button
            addClearButtonListener();
        });

        console.log("✅ Event listener attached successfully");

    } catch (err) {
        console.error("❌ Error loading model:", err);
        document.getElementById("result").innerHTML = 
            "⚠️ Error loading model. Check browser console for details.";
        document.getElementById("result").style.color = "orange";
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModel);
} else {
    loadModel();
}