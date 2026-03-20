<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HMP Deep-Analysis & Stress-Test Engine</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .loader { border-top-color: #3B82F6; -webkit-animation: spinner 1.5s linear infinite; animation: spinner 1.5s linear infinite; }
        @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .step-card { transition: all 0.3s; }
        .step-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>
</head>
<body class="text-slate-800">

    <!-- Header -->
    <header class="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="bg-blue-600 p-2 rounded-lg">
                    <i class="fa-solid fa-layer-group text-xl"></i>
                </div>
                <div>
                    <h1 class="font-bold text-lg tracking-wide">HMP INTELLIGENCE ENGINE</h1>
                    <p class="text-xs text-slate-400">Forensic Risk Analysis & Grant Matching</p>
                </div>
            </div>
            <div class="hidden md:flex items-center space-x-6 text-sm text-slate-400">
                <span class="flex items-center"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i> System Online</span>
                <span class="flex items-center"><i class="fa-solid fa-database text-blue-500 mr-2"></i> FEMA Region DB Active</span>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-6 py-10">
        
        <!-- STEP 1: INPUT FORM -->
        <div id="input-section" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden fade-in border border-slate-200">
            <div class="bg-slate-50 px-8 py-6 border-b border-slate-200">
                <h2 class="text-xl font-bold text-slate-800">1. Define Jurisdiction Scope</h2>
                <p class="text-sm text-slate-500">Select the specific hierarchy to tailor hazard profiles and grant eligibility.</p>
            </div>
            
            <div class="p-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Country -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Country</label>
                    <select id="country-select" class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="US" selected>United States</option>
                    </select>
                </div>
                <!-- State -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">State</label>
                    <select id="state-select" onchange="updateCounties()" class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select State...</option>
                        <option value="NC">North Carolina</option>
                        <option value="FL">Florida</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="NY">New York</option>
                    </select>
                </div>
                <!-- County -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">County</label>
                    <select id="county-select" onchange="updateCities()" disabled class="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
                        <option value="">Select State First</option>
                    </select>
                </div>
                <!-- City -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">City / Municipality</label>
                    <select id="city-select" disabled class="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
                        <option value="">Select County First</option>
                    </select>
                </div>
            </div>

            <div class="bg-slate-50 px-8 py-6 border-t border-slate-200">
                <h2 class="text-xl font-bold text-slate-800 mb-4">2. Upload Plan Document</h2>
                <div class="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:bg-blue-50 transition cursor-pointer relative">
                    <input type="file" id="file-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.docx">
                    <i class="fa-solid fa-file-pdf text-4xl text-blue-400 mb-3"></i>
                    <p class="font-semibold text-slate-700">Click to Upload PDF or Word</p>
                    <p class="text-xs text-slate-400 mt-1">Max 80MB • OCR Enabled • Secure Processing</p>
                    <p id="file-name" class="text-xs text-green-600 font-bold mt-2 hidden"></p>
                </div>
            </div>

            <div class="p-8 bg-slate-900 flex justify-end">
                <button onclick="runAnalysis()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center">
                    <i class="fa-solid fa-microchip mr-2"></i> Run Deep Analysis Engine
                </button>
            </div>
        </div>

        <!-- STEP 2: PROCESSING ANIMATION -->
        <div id="processing-section" class="hidden max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-xl p-8 fade-in">
            <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-slate-800">Running Forensic Stress-Test</h3>
                <p class="text-slate-500" id="processing-context">Analyzing uploaded plan against local hazards...</p>
            </div>
            
            <div class="space-y-6">
                <!-- Step 1 -->
                <div>
                    <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold text-slate-700">1. Extraction & PRI Ranking</span>
                        <span class="text-green-600 font-bold"><i class="fa-solid fa-check"></i> Done</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                </div>
                <!-- Step 2 -->
                <div>
                    <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold text-slate-700">2. Infrastructure Exposure Mapping</span>
                        <span class="text-green-600 font-bold"><i class="fa-solid fa-check"></i> Done</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                </div>
                <!-- Step 3 -->
                <div>
                    <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold text-slate-700">3. 100-Year Scenario Simulation</span>
                        <span id="status-3" class="text-yellow-600 font-bold animate-pulse">Simulating...</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2">
                        <div id="bar-3" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </div>
                <!-- Step 4 -->
                <div>
                    <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold text-slate-700">4. Grant Eligibility & Gap Analysis</span>
                        <span id="status-4" class="text-slate-400">Pending</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2">
                        <div id="bar-4" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- STEP 3: COMPREHENSIVE REPORT DASHBOARD -->
        <div id="report-section" class="hidden fade-in space-y-8">
            
            <!-- Report Header -->
            <div class="bg-white rounded-xl shadow-lg p-6 border-l-8 border-blue-600 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">Hazard Mitigation Assessment Report</h2>
                    <p class="text-slate-500 mt-1">
                        Jurisdiction: <span id="report-location" class="font-bold text-slate-800">Loading...</span>
                    </p>
                </div>
                <div class="text-right">
                    <div class="text-xs text-slate-400 uppercase font-bold">Analysis Date</div>
                    <div class="font-mono text-slate-700" id="current-date"></div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex space-x-1 bg-slate-200 p-1 rounded-lg w-fit">
                <button onclick="switchTab('executive')" class="tab-btn px-4 py-2 rounded-md text-sm font-bold bg-white text-blue-600 shadow-sm">Executive Summary</button>
                <button onclick="switchTab('stress')" class="tab-btn px-4 py-2 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-100">Stress-Test Scenarios</button>
                <button onclick="switchTab('grants')" class="tab-btn px-4 py-2 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-100">Grant Intelligence</button>
                <button onclick="switchTab('roadmap')" class="tab-btn px-4 py-2 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-100">Execution Roadmap</button>
            </div>

            <!-- TAB CONTENT: EXECUTIVE SUMMARY -->
            <div id="tab-executive" class="tab-content grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- KPI Cards -->
                <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-white p-5 rounded-xl shadow border-t-4 border-red-500">
                        <p class="text-xs text-slate-500 uppercase font-bold">Implementation Rate</p>
                        <h3 class="text-3xl font-bold text-slate-800 mt-2">1.2%</h3>
                        <p class="text-xs text-red-500 font-bold mt-1"><i class="fa-solid fa-arrow-down"></i> Critical Failure</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl shadow border-t-4 border-green-500">
                        <p class="text-xs text-slate-500 uppercase font-bold">FEMA Compliance</p>
                        <h3 class="text-3xl font-bold text-slate-800 mt-2">100%</h3>
                        <p class="text-xs text-green-600 font-bold mt-1">Plan Approved</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl shadow border-t-4 border-orange-500">
                        <p class="text-xs text-slate-500 uppercase font-bold">Unfunded Risk</p>
                        <h3 class="text-3xl font-bold text-slate-800 mt-2">$23.8M</h3>
                        <p class="text-xs text-orange-600 font-bold mt-1">High Priority Actions</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl shadow border-t-4 border-blue-500">
                        <p class="text-xs text-slate-500 uppercase font-bold">Grant Potential</p>
                        <h3 class="text-3xl font-bold text-slate-800 mt-2">$4.2M</h3>
                        <p class="text-xs text-blue-600 font-bold mt-1">Identified Opportunities</p>
                    </div>
                </div>

                <!-- Main Analysis Text -->
                <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                    <h3 class="font-bold text-lg text-slate-800 mb-4 border-b pb-2">Executive Thesis</h3>
                    <p class="text-slate-600 leading-relaxed mb-4">
                        The mitigation plan for <span class="font-bold text-slate-800" id="exec-location"></span> demonstrates <strong>100% regulatory compliance</strong> but suffers from a critical <strong>implementation gap (1.2%)</strong>. 
                    </p>
                    <p class="text-slate-600 leading-relaxed mb-4">
                        <strong>Top Hazard:</strong> <span class="font-bold text-red-600">Flooding (PRI 2.8)</span>. 
                        Despite high compliance, 508 of 511 mitigation actions are listed as "Not Started." This exposes critical infrastructure, including <span class="font-bold">5 major hospitals</span> and <span class="font-bold">218 schools</span>, to preventable damage.
                    </p>
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 class="font-bold text-blue-800 text-sm mb-2">Critical Insight:</h4>
                        <p class="text-sm text-blue-700">Without immediate action on <strong>MA-2 (Stormwater Upgrades)</strong>, the jurisdiction faces an estimated <strong>$2.2M in annualized loss</strong> during 100-year flood events.</p>
                    </div>
                </div>

                <!-- PRI Ranking -->
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="font-bold text-lg text-slate-800 mb-4 border-b pb-2">PRI Hazard Ranking</h3>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-sm font-bold mb-1">
                                <span>Flooding</span>
                                <span class="text-red-600">2.8 (High)</span>
                            </div>
                            <div class="w-full bg-slate-100 rounded-full h-2">
                                <div class="bg-red-500 h-2 rounded-full" style="width: 95%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm font-bold mb-1">
                                <span>Drought</span>
                                <span class="text-orange-600">2.5 (Med-High)</span>
                            </div>
                            <div class="w-full bg-slate-100 rounded-full h-2">
                                <div class="bg-orange-500 h-2 rounded-full" style="width: 80%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm font-bold mb-1">
                                <span>Extreme Heat</span>
                                <span class="text-yellow-600">2.4 (Med)</span>
                            </div>
                            <div class="w-full bg-slate-100 rounded-full h-2">
                                <div class="bg-yellow-500 h-2 rounded-full" style="width: 75%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB CONTENT: STRESS TEST -->
            <div id="tab-stress" class="tab-content hidden">
                <div class="bg-slate-900 text-white rounded-xl shadow-lg p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h3 class="text-2xl font-bold text-red-400"><i class="fa-solid fa-triangle-exclamation mr-2"></i> STRESS-TEST SIMULATION</h3>
                            <p class="text-slate-400">Scenario: 100-Year Flood Event impacting local basin.</p>
                        </div>
                        <div class="bg-red-900/50 px-4 py-2 rounded border border-red-700 text-red-300 font-mono text-sm">
                            SIMULATION STATUS: FAILED
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                            <h4 class="font-bold text-lg mb-2">Failure Chain A: Infrastructure</h4>
                            <p class="text-slate-300 text-sm mb-4">Action <strong>MA-2 (Stormwater Upgrade)</strong> is Not Started.</p>
                            <ul class="space-y-2 text-sm text-slate-400">
                                <li class="flex items-center"><i class="fa-solid fa-arrow-right text-red-500 mr-2"></i> Drainage capacity exceeded by 40%.</li>
                                <li class="flex items-center"><i class="fa-solid fa-arrow-right text-red-500 mr-2"></i> Backflow into municipal water treatment.</li>
                                <li class="font-bold text-white mt-2">Result: $2.2M Preventable Damage</li>
                            </ul>
                        </div>
                        <div class="bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                            <h4 class="font-bold text-lg mb-2">Failure Chain B: Critical Facilities</h4>
                            <p class="text-slate-300 text-sm mb-4">Action <strong>MA-6 (Backup Generators)</strong> is Not Started.</p>
                            <ul class="space-y-2 text-sm text-slate-400">
                                <li class="flex items-center"><i class="fa-solid fa-arrow-right text-orange-500 mr-2"></i> Grid failure at T+4 hours.</li>
                                <li class="flex items-center"><i class="fa-solid fa-arrow-right text-orange-500 mr-2"></i> 5 Hospitals lose primary power.</li>
                                <li class="font-bold text-white mt-2">Result: Operational Degradation & Evacuation Risk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB CONTENT: GRANTS -->
            <div id="tab-grants" class="tab-content hidden">
                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="font-bold text-lg text-slate-800 mb-4">Grant Intelligence & Funding Matches</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-100 text-slate-600 text-xs uppercase">
                                    <th class="p-4 rounded-tl-lg">Program</th>
                                    <th class="p-4">Priority Score</th>
                                    <th class="p-4">Matched Actions</th>
                                    <th class="p-4">Est. Award</th>
                                    <th class="p-4 rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="border-b hover:bg-slate-50">
                                    <td class="p-4 font-bold text-blue-600">BRIC (Building Resilient Infrastructure)</td>
                                    <td class="p-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">95/100</span></td>
                                    <td class="p-4">MA-2 (Stormwater), MA-6 (Generators)</td>
                                    <td class="p-4 font-bold">$2.0M</td>
                                    <td class="p-4"><span class="text-green-600 font-bold">High Eligibility</span></td>
                                </tr>
                                <tr class="border-b hover:bg-slate-50">
                                    <td class="p-4 font-bold text-blue-600">FMA (Flood Mitigation Assistance)</td>
                                    <td class="p-4"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">70/100</span></td>
                                    <td class="p-4">MA-1 (Property Acquisition)</td>
                                    <td class="p-4 font-bold">$800K</td>
                                    <td class="p-4"><span class="text-yellow-600 font-bold">Moderate Eligibility</span></td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 font-bold text-blue-600">HMGP (Hazard Mitigation Grant)</td>
                                    <td class="p-4"><span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">40/100</span></td>
                                    <td class="p-4">General Infrastructure</td>
                                    <td class="p-4 font-bold">Variable</td>
                                    <td class="p-4"><span class="text-gray-500">Post-Disaster Only</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB CONTENT: ROADMAP -->
            <div id="tab-roadmap" class="tab-content hidden">
                <div class="bg-white rounded-xl shadow p-8">
                    <h3 class="font-bold text-xl text-slate-800 mb-6 flex items-center">
                        <i class="fa-solid fa-map-signs text-blue-600 mr-3"></i> 90-Day Step-by-Step Execution Guide
                    </h3>
                    
                    <div class="relative border-l-4 border-blue-200 ml-4 space-y-10 pb-4">
                        
                        <!-- Phase 1 -->
                        <div class="relative pl-8">
                            <div class="absolute -left-[13px] top-0 bg-blue-600 h-6 w-6 rounded-full border-4 border-white"></div>
                            <h4 class="font-bold text-lg text-slate-800">Phase 1: Preparation & Scoping (Weeks 1-2)</h4>
                            <div class="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <ul class="space-y-2 text-sm text-slate-700">
                                    <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> <strong>Task 1.1:</strong> Confirm exact scope of work for MA-2 (Stormwater) and MA-6 (Generators).</li>
                                    <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> <strong>Task 1.2:</strong> Initiate Benefit-Cost Analysis (BCA) using FEMA BCA Toolkit v6.0.</li>
                                    <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> <strong>Task 1.3:</strong> Secure letters of support from Hospital Administrators and Fire Chiefs.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Phase 2 -->
                        <div class="relative pl-8">
                            <div class="absolute -left-[13px] top-0 bg-blue-400 h-6 w-6 rounded-full border-4 border-white"></div>
                            <h4 class="font-bold text-lg text-slate-800">Phase 2: Application Drafting (Weeks 3-4)</h4>
                            <div class="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <ul class="space-y-2 text-sm text-slate-700">
                                    <li class="flex items-start"><i class="fa-solid fa-pen text-blue-500 mt-1 mr-2"></i> <strong>Task 2.1:</strong> Draft BRIC Narrative focusing on "Critical Infrastructure Protection."</li>
                                    <li class="flex items-start"><i class="fa-solid fa-pen text-blue-500 mt-1 mr-2"></i> <strong>Task 2.2:</strong> Complete SF-424 forms and Environmental/Historic Preservation reviews.</li>
                                    <li class="flex items-start"><i class="fa-solid fa-pen text-blue-500 mt-1 mr-2"></i> <strong>Task 2.3:</strong> Finalize local match commitment (25% for BRIC).</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Phase 3 -->
                        <div class="relative pl-8">
                            <div class="absolute -left-[13px] top-0 bg-blue-200 h-6 w-6 rounded-full border-4 border-white"></div>
                            <h4 class="font-bold text-lg text-slate-800">Phase 3: Submission & Review (Weeks 5-8)</h4>
                            <div class="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <ul class="space-y-2 text-sm text-slate-700">
                                    <li class="flex items-start"><i class="fa-solid fa-paper-plane text-slate-500 mt-1 mr-2"></i> <strong>Task 3.1:</strong> Submit pre-application to State Hazard Mitigation Officer (SHMO).</li>
                                    <li class="flex items-start"><i class="fa-solid fa-paper-plane text-slate-500 mt-1 mr-2"></i> <strong>Task 3.2:</strong> Address any technical deficiencies returned by the state.</li>
                                    <li class="flex items-start"><i class="fa-solid fa-paper-plane text-slate-500 mt-1 mr-2"></i> <strong>Task 3.3:</strong> Present final funding request to County Board of Commissioners.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="text-center mt-10 pb-10">
                <button class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                    <i class="fa-solid fa-file-pdf mr-2"></i> Download Full Comprehensive Report (PDF)
                </button>
            </div>

        </div>

    </main>

    <script>
        // --- DATA STRUCTURE FOR LOCATIONS ---
        const locationData = {
            "NC": {
                name: "North Carolina",
                counties: {
                    "Guilford": ["Greensboro", "High Point", "Jamestown", "Summerfield"],
                    "Wake": ["Raleigh", "Cary", "Apex", "Wake Forest"],
                    "Mecklenburg": ["Charlotte", "Huntersville", "Matthews"]
                }
            },
            "FL": {
                name: "Florida",
                counties: {
                    "Miami-Dade": ["Miami", "Hialeah", "Homestead"],
                    "Broward": ["Fort Lauderdale", "Pembroke Pines", "Hollywood"],
                    "Orange": ["Orlando", "Winter Park", "Apopka"]
                }
            },
            "CA": {
                name: "California",
                counties: {
                    "Los Angeles": ["Los Angeles", "Long Beach", "Santa Clarita"],
                    "San Diego": ["San Diego", "Chula Vista", "Oceanside"],
                    "Orange": ["Anaheim", "Santa Ana", "Irvine"]
                }
            },
            "TX": {
                name: "Texas",
                counties: {
                    "Harris": ["Houston", "Pasadena", "Baytown"],
                    "Dallas": ["Dallas", "Irving", "Garland"],
                    "Travis": ["Austin", "Round Rock", "Pflugerville"]
                }
            },
            "NY": {
                name: "New York",
                counties: {
                    "New York": ["Manhattan"],
                    "Kings": ["Brooklyn"],
                    "Queens": ["Queens"],
                    "Erie": ["Buffalo", "Cheektowaga"]
                }
            }
        };

        // --- DOM ELEMENTS ---
        const stateSelect = document.getElementById('state-select');
        const countySelect = document.getElementById('county-select');
        const citySelect = document.getElementById('city-select');
        const fileInput = document.getElementById('file-upload');
        const fileNameDisplay = document.getElementById('file-name');

        // --- EVENT LISTENERS ---
        fileInput.addEventListener('change', function() {
            if(this.files && this.files[0]) {
                fileNameDisplay.textContent = "Selected: " + this.files[0].name;
                fileNameDisplay.classList.remove('hidden');
            }
        });

        function updateCounties() {
            const stateCode = stateSelect.value;
            countySelect.innerHTML = '<option value="">Select County...</option>';
            citySelect.innerHTML = '<option value="">Select County First</option>';
            citySelect.disabled = true;

            if (stateCode && locationData[stateCode]) {
                countySelect.disabled = false;
                const counties = Object.keys(locationData[stateCode].counties);
                counties.forEach(county => {
                    const option = document.createElement('option');
                    option.value = county;
                    option.textContent = county;
                    countySelect.appendChild(option);
                });
            } else {
                countySelect.disabled = true;
            }
        }

        function updateCities() {
            const stateCode = stateSelect.value;
            const countyName = countySelect.value;
            citySelect.innerHTML = '<option value="">Select City...</option>';

            if (stateCode && countyName && locationData[stateCode].counties[countyName]) {
                citySelect.disabled = false;
                const cities = locationData[stateCode].counties[countyName];
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            } else {
                citySelect.disabled = true;
            }
        }

        // --- SIMULATION LOGIC ---
        function runAnalysis() {
            // Validation
            if(!stateSelect.value || !countySelect.value || !citySelect.value) {
                alert("Please select a full location hierarchy (State > County > City) and upload a file.");
                return;
            }
            if(!fileInput.files.length) {
                alert("Please upload a PDF or Word document.");
                return;
            }

            // UI Transition
            document.getElementById('input-section').classList.add('hidden');
            document.getElementById('processing-section').classList.remove('hidden');
            
            const locationString = `${citySelect.value}, ${countySelect.value}, ${locationData[stateSelect.value].name}`;
            document.getElementById('processing-context').textContent = `Analyzing ${locationString} Hazard Mitigation Plan...`;

            // Animation Sequence
            setTimeout(() => {
                document.getElementById('bar-3').style.width = "100%";
                document.getElementById('status-3').innerHTML = '<i class="fa-solid fa-check"></i> Complete';
                document.getElementById('status-3').className = "text-green-600 font-bold";
            }, 1500);

            setTimeout(() => {
                document.getElementById('bar-4').style.width = "100%";
                document.getElementById('status-4').innerHTML = '<i class="fa-solid fa-check"></i> Complete';
                document.getElementById('status-4').className = "text-green-600 font-bold";
                
                // Show Results
                setTimeout(() => {
                    showResults(locationString);
                }, 800);
            }, 3000);
        }

        function showResults(location) {
            document.getElementById('processing-section').classList.add('hidden');
            document.getElementById('report-section').classList.remove('hidden');
            
            // Inject Location Data
            document.getElementById('report-location').textContent = location;
            document.getElementById('exec-location').textContent = location;
            document.getElementById('current-date').textContent = new Date().toLocaleDateString();
        }

        // --- TAB LOGIC ---
        function switchTab(tabName) {
            // Hide all contents
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            // Reset buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
                btn.classList.add('text-slate-600', 'hover:bg-slate-100');
            });

            // Show selected
            document.getElementById(`tab-${tabName}`).classList.remove('hidden');
            
            // Highlight button
            const activeBtn = event.currentTarget;
            activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
            activeBtn.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
        }
    </script>
</body>
</html>
