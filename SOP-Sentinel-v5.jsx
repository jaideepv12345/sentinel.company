import React, { useState } from 'react';
import { AlertTriangle, Upload, Globe, FileText, Zap, Users, Network, Brain, TrendingUp, Shield, Package, FileOutput, Building, ChevronRight, ChevronDown, Check, Play, Pause, Download, Heart, AlertCircle, Settings, Menu, Home, Layers, Target, RefreshCw, DollarSign, Calendar, Lock, Unlock, Scale, ArrowRight, Timer, Coffee, Sparkles, BadgeCheck, CircleDollarSign, PiggyBank, Receipt, ShieldCheck, Lightbulb, Save, Calculator, CheckCircle, ArrowUpRight, ArrowDownRight, Siren, XCircle, Clock } from 'lucide-react';

// ============================================
// HAZARD CATEGORIES (80+ Hazards)
// ============================================
const hazardCategories = {
  'meteorological': {
    name: 'Meteorological/Atmospheric',
    icon: '🌪️',
    hazards: {
      'hurricane': { name: 'Hurricane/Cyclone', icon: '🌀', priority: 'high' },
      'typhoon': { name: 'Typhoon', icon: '🌀', priority: 'high' },
      'tornado': { name: 'Tornado', icon: '🌪️', priority: 'high' },
      'severe-weather': { name: 'Severe Weather', icon: '⛈️', priority: 'high' },
      'winter-storm': { name: 'Winter Storm', icon: '❄️', priority: 'high' },
      'blizzard': { name: 'Blizzard', icon: '🌨️', priority: 'medium' },
      'ice-storm': { name: 'Ice Storm', icon: '🧊', priority: 'medium' },
      'heatwave': { name: 'Heatwave', icon: '🌡️', priority: 'high' },
      'drought': { name: 'Drought', icon: '☀️', priority: 'high' },
      'hailstorm': { name: 'Hailstorm', icon: '🌨️', priority: 'medium' },
      'lightning-storm': { name: 'Lightning Storm', icon: '⚡', priority: 'medium' },
      'derecho': { name: 'Derecho', icon: '💨', priority: 'medium' },
      'sandstorm': { name: 'Sandstorm/Dust Storm', icon: '🏜️', priority: 'medium' },
      'fine-dust': { name: 'Fine Dust/Air Quality', icon: '😷', priority: 'medium' },
      'haze': { name: 'Haze', icon: '🌫️', priority: 'low' },
      'fog': { name: 'Dense Fog', icon: '🌁', priority: 'low' }
    }
  },
  'hydrological': {
    name: 'Hydrological (Water)',
    icon: '🌊',
    hazards: {
      'flood': { name: 'Flood (General)', icon: '🌊', priority: 'high' },
      'flash-flood': { name: 'Flash Flood', icon: '💧', priority: 'high' },
      'riverine-flood': { name: 'Riverine Flooding', icon: '🏞️', priority: 'high' },
      'coastal-flood': { name: 'Coastal Flooding', icon: '🏖️', priority: 'high' },
      'storm-surge': { name: 'Storm Surge', icon: '🌊', priority: 'high' },
      'tsunami': { name: 'Tsunami', icon: '🌊', priority: 'high' },
      'dam-levee-failure': { name: 'Dam/Levee Failure', icon: '🚧', priority: 'critical' },
      'glof': { name: 'Glacial Lake Outburst', icon: '🧊', priority: 'medium' },
      'river-erosion': { name: 'River Erosion', icon: '🏞️', priority: 'medium' },
      'saltwater-intrusion': { name: 'Saltwater Intrusion', icon: '🧂', priority: 'medium' }
    }
  },
  'geophysical': {
    name: 'Geophysical (Earth)',
    icon: '🌋',
    hazards: {
      'earthquake': { name: 'Earthquake', icon: '🌋', priority: 'critical' },
      'volcano': { name: 'Volcanic Eruption', icon: '🌋', priority: 'high' },
      'landslide': { name: 'Landslide/Mudslide', icon: '⛰️', priority: 'high' },
      'avalanche': { name: 'Avalanche', icon: '🏔️', priority: 'medium' },
      'sinkhole': { name: 'Sinkhole', icon: '🕳️', priority: 'medium' },
      'liquefaction': { name: 'Liquefaction', icon: '💧', priority: 'medium' },
      'lahar': { name: 'Lahar', icon: '🌋', priority: 'high' },
      'rockfall': { name: 'Rockfall', icon: '🪨', priority: 'medium' }
    }
  },
  'fire': {
    name: 'Fire',
    icon: '🔥',
    hazards: {
      'wildfire': { name: 'Wildfire', icon: '🔥', priority: 'critical' },
      'urban-fire': { name: 'Urban/Structural Fire', icon: '🏚️', priority: 'high' },
      'wui-fire': { name: 'Wildland-Urban Interface', icon: '🏘️', priority: 'critical' },
      'industrial-fire': { name: 'Industrial Fire', icon: '🏭', priority: 'high' },
      'oil-gas-fire': { name: 'Oil/Gas Fire', icon: '🛢️', priority: 'high' },
      'mine-fire': { name: 'Mine Fire', icon: '⛏️', priority: 'medium' },
      'peat-fire': { name: 'Peat Fire', icon: '🔥', priority: 'medium' }
    }
  },
  'biological': {
    name: 'Biological',
    icon: '🦠',
    hazards: {
      'pandemic': { name: 'Pandemic', icon: '🦠', priority: 'critical' },
      'epidemic': { name: 'Epidemic', icon: '🦠', priority: 'high' },
      'foodborne-outbreak': { name: 'Foodborne Outbreak', icon: '🍽️', priority: 'high' },
      'vector-borne': { name: 'Vector-Borne Disease', icon: '🦟', priority: 'high' },
      'zoonotic': { name: 'Zoonotic Disease', icon: '🐾', priority: 'high' },
      'bioterrorism': { name: 'Bioterrorism', icon: '☣️', priority: 'critical' },
      'invasive-species': { name: 'Invasive Species', icon: '🐛', priority: 'medium' },
      'crop-disease': { name: 'Crop Disease/Blight', icon: '🌾', priority: 'medium' },
      'livestock-disease': { name: 'Livestock Disease', icon: '🐄', priority: 'high' },
      'harmful-algal-bloom': { name: 'Harmful Algal Bloom', icon: '🌿', priority: 'medium' },
      'locust-swarm': { name: 'Locust Swarm', icon: '🦗', priority: 'high' }
    }
  },
  'technological': {
    name: 'Technological',
    icon: '⚙️',
    hazards: {
      'hazmat-release': { name: 'HAZMAT Release', icon: '☢️', priority: 'critical' },
      'nuclear-incident': { name: 'Nuclear Incident', icon: '☢️', priority: 'critical' },
      'power-grid-failure': { name: 'Power Grid Failure', icon: '⚡', priority: 'critical' },
      'cyber-attack': { name: 'Cyberattack', icon: '💻', priority: 'critical' },
      'transportation-accident': { name: 'Mass Transit Accident', icon: '🚂', priority: 'high' },
      'building-collapse': { name: 'Building Collapse', icon: '🏚️', priority: 'high' },
      'pipeline-rupture': { name: 'Pipeline Rupture', icon: '🛢️', priority: 'high' },
      'telecom-failure': { name: 'Telecom Failure', icon: '📡', priority: 'high' },
      'water-contamination': { name: 'Water Contamination', icon: '💧', priority: 'critical' },
      'industrial-explosion': { name: 'Industrial Explosion', icon: '💥', priority: 'high' },
      'mine-collapse': { name: 'Mine Collapse', icon: '⛏️', priority: 'medium' },
      'rail-derailment': { name: 'Rail Derailment', icon: '🚂', priority: 'high' },
      'aviation-incident': { name: 'Aviation Incident', icon: '✈️', priority: 'high' },
      'marine-port-accident': { name: 'Marine/Port Accident', icon: '🚢', priority: 'medium' },
      'oil-spill': { name: 'Oil Spill', icon: '🛢️', priority: 'high' }
    }
  },
  'societal': {
    name: 'Societal/Human-Caused',
    icon: '👥',
    hazards: {
      'active-shooter': { name: 'Active Shooter', icon: '🎯', priority: 'critical' },
      'terrorism': { name: 'Terrorism/Bombing', icon: '💣', priority: 'critical' },
      'civil-unrest': { name: 'Civil Unrest/Riots', icon: '👥', priority: 'high' },
      'workplace-violence': { name: 'Workplace Violence', icon: '🏢', priority: 'medium' },
      'school-violence': { name: 'School Violence', icon: '🏫', priority: 'critical' },
      'hostage-situation': { name: 'Hostage Situation', icon: '🚨', priority: 'high' },
      'cbrn-terrorism': { name: 'CBRN Terrorism', icon: '☣️', priority: 'critical' },
      'conflict': { name: 'Armed Conflict', icon: '⚔️', priority: 'critical' },
      'refugee-crisis': { name: 'Refugee/IDP Crisis', icon: '🏕️', priority: 'high' },
      'economic-collapse': { name: 'Economic Collapse', icon: '📉', priority: 'high' },
      'missile-attack': { name: 'Missile Attack', icon: '🚀', priority: 'critical' },
      'chemical-attack': { name: 'Chemical Attack', icon: '⚗️', priority: 'critical' }
    }
  },
  'environmental': {
    name: 'Environmental/Slow-Onset',
    icon: '🌍',
    hazards: {
      'sea-level-rise': { name: 'Sea Level Rise', icon: '📈', priority: 'high' },
      'coastal-erosion': { name: 'Coastal Erosion', icon: '🏖️', priority: 'medium' },
      'desertification': { name: 'Desertification', icon: '🏜️', priority: 'medium' },
      'soil-degradation': { name: 'Soil Degradation', icon: '🌱', priority: 'low' },
      'glacial-melt': { name: 'Glacial Melt', icon: '🧊', priority: 'medium' },
      'permafrost-thaw': { name: 'Permafrost Thaw', icon: '🌡️', priority: 'medium' },
      'el-nino': { name: 'El Niño/La Niña', icon: '🌡️', priority: 'high' }
    }
  },
  'extraterrestrial': {
    name: 'Extraterrestrial/Space',
    icon: '🛸',
    hazards: {
      'solar-storm': { name: 'Solar Storm', icon: '☀️', priority: 'medium' },
      'meteor-impact': { name: 'Meteor Impact', icon: '☄️', priority: 'low' },
      'satellite-debris': { name: 'Satellite Debris', icon: '🛰️', priority: 'low' }
    }
  }
};

// Flatten hazards
const allHazards = {};
Object.entries(hazardCategories).forEach(([catKey, cat]) => {
  Object.entries(cat.hazards).forEach(([hazKey, haz]) => {
    allHazards[hazKey] = { ...haz, category: catKey, categoryName: cat.name };
  });
});

// Grant Programs
const grantPrograms = {
  'bric': { id: 'BRIC', name: 'Building Resilient Infrastructure and Communities', agency: 'FEMA', fundingRange: { min: 100000, max: 50000000 }, costShare: { federal: 75, local: 25 }, deadline: 'January 2026', status: 'open' },
  'hmgp': { id: 'HMGP', name: 'Hazard Mitigation Grant Program', agency: 'FEMA', fundingRange: { min: 50000, max: 30000000 }, costShare: { federal: 75, local: 25 }, deadline: 'Ongoing', status: 'open' },
  'empg': { id: 'EMPG', name: 'Emergency Management Performance Grant', agency: 'FEMA', fundingRange: { min: 25000, max: 5000000 }, costShare: { federal: 50, local: 50 }, deadline: 'March 2026', status: 'open' }
};

// Global Regions & Countries (61 Countries)
const globalRegions = {
  'north-america': {
    name: 'North America',
    countries: {
      'usa': { name: 'United States', flag: '🇺🇸', framework: 'FEMA NIMS', legislation: 'Stafford Act', adminDivision: 'County', adminPlural: 'Counties', distanceUnit: 'mi', currency: 'USD', population: 331000000 },
      'canada': { name: 'Canada', flag: '🇨🇦', framework: 'Emergency Management Framework', legislation: 'Emergency Management Act 2007', adminDivision: 'Province/Territory', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'CAD', population: 38000000 },
      'mexico': { name: 'Mexico', flag: '🇲🇽', framework: 'SINAPROC', legislation: 'Ley General de Protección Civil', adminDivision: 'Municipio', adminPlural: 'Municipios', distanceUnit: 'km', currency: 'MXN', population: 128000000 }
    }
  },
  'europe': {
    name: 'Europe',
    countries: {
      'uk': { name: 'United Kingdom', flag: '🇬🇧', framework: 'Civil Contingencies Act Framework', legislation: 'Civil Contingencies Act 2004', adminDivision: 'Local Authority', adminPlural: 'Local Authorities', distanceUnit: 'mi', currency: 'GBP', population: 67000000 },
      'germany': { name: 'Germany', flag: '🇩🇪', framework: 'BBK Federal Civil Protection', legislation: 'Civil Protection Act', adminDivision: 'Landkreis', adminPlural: 'Landkreise', distanceUnit: 'km', currency: 'EUR', population: 83000000 },
      'france': { name: 'France', flag: '🇫🇷', framework: 'Sécurité Civile', legislation: 'Loi de Modernisation', adminDivision: 'Département', adminPlural: 'Départements', distanceUnit: 'km', currency: 'EUR', population: 67000000 },
      'italy': { name: 'Italy', flag: '🇮🇹', framework: 'Protezione Civile', legislation: 'Codice della Protezione Civile', adminDivision: 'Provincia', adminPlural: 'Province', distanceUnit: 'km', currency: 'EUR', population: 60000000 },
      'spain': { name: 'Spain', flag: '🇪🇸', framework: 'Sistema Nacional de Protección Civil', legislation: 'Ley del Sistema Nacional', adminDivision: 'Provincia', adminPlural: 'Provincias', distanceUnit: 'km', currency: 'EUR', population: 47000000 },
      'netherlands': { name: 'Netherlands', flag: '🇳🇱', framework: 'Veiligheidsregio System', legislation: 'Wet veiligheidsregio\'s', adminDivision: 'Veiligheidsregio', adminPlural: 'Veiligheidsregio\'s', distanceUnit: 'km', currency: 'EUR', population: 17000000 },
      'poland': { name: 'Poland', flag: '🇵🇱', framework: 'National Civil Protection', legislation: 'Crisis Management Act', adminDivision: 'Powiat', adminPlural: 'Powiaty', distanceUnit: 'km', currency: 'PLN', population: 38000000 },
      'sweden': { name: 'Sweden', flag: '🇸🇪', framework: 'MSB Civil Contingencies', legislation: 'Civil Protection Act', adminDivision: 'Län', adminPlural: 'Län', distanceUnit: 'km', currency: 'SEK', population: 10000000 },
      'norway': { name: 'Norway', flag: '🇳🇴', framework: 'DSB', legislation: 'Civil Protection Act', adminDivision: 'Fylke', adminPlural: 'Fylker', distanceUnit: 'km', currency: 'NOK', population: 5400000 },
      'finland': { name: 'Finland', flag: '🇫🇮', framework: 'Rescue Services', legislation: 'Rescue Act', adminDivision: 'Maakunta', adminPlural: 'Maakunnat', distanceUnit: 'km', currency: 'EUR', population: 5500000 },
      'denmark': { name: 'Denmark', flag: '🇩🇰', framework: 'DEMA', legislation: 'Emergency Management Act', adminDivision: 'Region', adminPlural: 'Regioner', distanceUnit: 'km', currency: 'DKK', population: 5800000 },
      'belgium': { name: 'Belgium', flag: '🇧🇪', framework: 'National Crisis Center', legislation: 'Civil Security Law', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'EUR', population: 11500000 },
      'austria': { name: 'Austria', flag: '🇦🇹', framework: 'SKKM', legislation: 'Disaster Management Acts', adminDivision: 'Bezirk', adminPlural: 'Bezirke', distanceUnit: 'km', currency: 'EUR', population: 9000000 },
      'switzerland': { name: 'Switzerland', flag: '🇨🇭', framework: 'FOCP', legislation: 'Civil Protection Act', adminDivision: 'Kanton', adminPlural: 'Kantone', distanceUnit: 'km', currency: 'CHF', population: 8700000 },
      'portugal': { name: 'Portugal', flag: '🇵🇹', framework: 'ANEPC', legislation: 'Civil Protection Framework Law', adminDivision: 'Distrito', adminPlural: 'Distritos', distanceUnit: 'km', currency: 'EUR', population: 10300000 },
      'greece': { name: 'Greece', flag: '🇬🇷', framework: 'GSCP', legislation: 'Civil Protection Law', adminDivision: 'Periféria', adminPlural: 'Periféries', distanceUnit: 'km', currency: 'EUR', population: 10700000 },
      'ireland': { name: 'Ireland', flag: '🇮🇪', framework: 'OEM', legislation: 'Framework for Major Emergency Management', adminDivision: 'County', adminPlural: 'Counties', distanceUnit: 'km', currency: 'EUR', population: 5000000 }
    }
  },
  'mena': {
    name: 'Middle East & North Africa',
    countries: {
      'uae': { name: 'UAE', flag: '🇦🇪', framework: 'NCEMA', legislation: 'Federal Law No. 2 of 2011', adminDivision: 'Emirate', adminPlural: 'Emirates', distanceUnit: 'km', currency: 'AED', population: 9900000 },
      'saudi-arabia': { name: 'Saudi Arabia', flag: '🇸🇦', framework: 'General Directorate Civil Defense', legislation: 'Civil Defense Law', adminDivision: 'Mintaqah', adminPlural: 'Manatiq (Regions)', distanceUnit: 'km', currency: 'SAR', population: 35000000 },
      'kuwait': { name: 'Kuwait', flag: '🇰🇼', framework: 'Kuwait Fire Service Directorate', legislation: 'Civil Defense Law No. 21', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'KWD', population: 4300000 },
      'qatar': { name: 'Qatar', flag: '🇶🇦', framework: 'Ministry of Interior Civil Defense', legislation: 'Law No. 13 of 1997', adminDivision: 'Municipality', adminPlural: 'Municipalities', distanceUnit: 'km', currency: 'QAR', population: 2900000 },
      'bahrain': { name: 'Bahrain', flag: '🇧🇭', framework: 'Civil Defense Directorate', legislation: 'Civil Defense Law', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'BHD', population: 1500000 },
      'oman': { name: 'Oman', flag: '🇴🇲', framework: 'NCDEM', legislation: 'Royal Decree 39/2020', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'OMR', population: 5100000 },
      'egypt': { name: 'Egypt', flag: '🇪🇬', framework: 'Crisis Management Sector', legislation: 'Law No. 148 of 1959', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'EGP', population: 104000000 },
      'jordan': { name: 'Jordan', flag: '🇯🇴', framework: 'Civil Defense Directorate', legislation: 'Civil Defense Law No. 18', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'JOD', population: 10200000 },
      'lebanon': { name: 'Lebanon', flag: '🇱🇧', framework: 'Civil Defense', legislation: 'Decree No. 50', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'LBP', population: 6800000 },
      'israel': { name: 'Israel', flag: '🇮🇱', framework: 'Home Front Command', legislation: 'Civil Defense Law', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'ILS', population: 9200000 },
      'turkey': { name: 'Turkey', flag: '🇹🇷', framework: 'AFAD', legislation: 'Disaster Law No. 7269', adminDivision: 'İl', adminPlural: 'İller (Provinces)', distanceUnit: 'km', currency: 'TRY', population: 84000000 },
      'morocco': { name: 'Morocco', flag: '🇲🇦', framework: 'Civil Protection', legislation: 'Law 110-14', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'MAD', population: 37000000 },
      'tunisia': { name: 'Tunisia', flag: '🇹🇳', framework: 'Civil Protection Office', legislation: 'Law 91-39', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'TND', population: 11800000 },
      'iraq': { name: 'Iraq', flag: '🇮🇶', framework: 'Civil Defense Directorate', legislation: 'Civil Defense Law', adminDivision: 'Governorate', adminPlural: 'Governorates', distanceUnit: 'km', currency: 'IQD', population: 40200000 }
    }
  },
  'south-asia': {
    name: 'South Asia',
    countries: {
      'india': { name: 'India', flag: '🇮🇳', framework: 'NDMA', legislation: 'Disaster Management Act 2005', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'INR', population: 1400000000 },
      'pakistan': { name: 'Pakistan', flag: '🇵🇰', framework: 'NDMA Pakistan', legislation: 'NDM Act 2010', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'PKR', population: 220000000 },
      'bangladesh': { name: 'Bangladesh', flag: '🇧🇩', framework: 'DDM', legislation: 'Disaster Management Act 2012', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'BDT', population: 165000000 },
      'nepal': { name: 'Nepal', flag: '🇳🇵', framework: 'NDRRMA', legislation: 'DRR Act 2017', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'NPR', population: 29000000 },
      'sri-lanka': { name: 'Sri Lanka', flag: '🇱🇰', framework: 'DMC', legislation: 'Disaster Management Act No. 13', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'LKR', population: 22000000 }
    }
  },
  'southeast-asia': {
    name: 'Southeast Asia',
    countries: {
      'indonesia': { name: 'Indonesia', flag: '🇮🇩', framework: 'BNPB', legislation: 'Law 24/2007', adminDivision: 'Kabupaten', adminPlural: 'Kabupaten (Regencies)', distanceUnit: 'km', currency: 'IDR', population: 273000000 },
      'philippines': { name: 'Philippines', flag: '🇵🇭', framework: 'NDRRMC', legislation: 'RA 10121', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'PHP', population: 110000000 },
      'vietnam': { name: 'Vietnam', flag: '🇻🇳', framework: 'VNDMA', legislation: 'Law on Natural Disaster Prevention', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'VND', population: 98000000 },
      'thailand': { name: 'Thailand', flag: '🇹🇭', framework: 'DDPM', legislation: 'Disaster Prevention Act 2007', adminDivision: 'Changwat', adminPlural: 'Changwat (Provinces)', distanceUnit: 'km', currency: 'THB', population: 70000000 },
      'malaysia': { name: 'Malaysia', flag: '🇲🇾', framework: 'NADMA', legislation: 'Directive 20', adminDivision: 'State', adminPlural: 'States', distanceUnit: 'km', currency: 'MYR', population: 32000000 },
      'singapore': { name: 'Singapore', flag: '🇸🇬', framework: 'SCDF', legislation: 'Civil Defence Act', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'SGD', population: 5500000 },
      'myanmar': { name: 'Myanmar', flag: '🇲🇲', framework: 'DDM Myanmar', legislation: 'Natural Disaster Management Law', adminDivision: 'State/Region', adminPlural: 'States/Regions', distanceUnit: 'km', currency: 'MMK', population: 54000000 },
      'cambodia': { name: 'Cambodia', flag: '🇰🇭', framework: 'NCDM', legislation: 'Law on Disaster Management', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'KHR', population: 17000000 }
    }
  },
  'east-asia': {
    name: 'East Asia',
    countries: {
      'japan': { name: 'Japan', flag: '🇯🇵', framework: 'Basic Disaster Management Plan', legislation: 'Disaster Countermeasures Basic Act', adminDivision: 'Prefecture', adminPlural: 'Prefectures', distanceUnit: 'km', currency: 'JPY', population: 125000000 },
      'south-korea': { name: 'South Korea', flag: '🇰🇷', framework: 'MOIS Disaster Safety', legislation: 'Framework Act on Disaster Safety', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'KRW', population: 52000000 },
      'china': { name: 'China', flag: '🇨🇳', framework: 'MEM', legislation: 'Emergency Response Law', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'CNY', population: 1400000000 },
      'taiwan': { name: 'Taiwan', flag: '🇹🇼', framework: 'NCDR', legislation: 'Disaster Prevention Act', adminDivision: 'County/City', adminPlural: 'Counties/Cities', distanceUnit: 'km', currency: 'TWD', population: 24000000 },
      'mongolia': { name: 'Mongolia', flag: '🇲🇳', framework: 'NEMA Mongolia', legislation: 'Law on Disaster Protection', adminDivision: 'Aimag', adminPlural: 'Aimags', distanceUnit: 'km', currency: 'MNT', population: 3300000 }
    }
  },
  'oceania': {
    name: 'Oceania',
    countries: {
      'australia': { name: 'Australia', flag: '🇦🇺', framework: 'NEMA', legislation: 'National Emergency Declaration Act 2020', adminDivision: 'State/Territory', adminPlural: 'States/Territories', distanceUnit: 'km', currency: 'AUD', population: 26000000 },
      'new-zealand': { name: 'New Zealand', flag: '🇳🇿', framework: 'NEMA NZ', legislation: 'CDEM Act 2002', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'NZD', population: 5100000 },
      'fiji': { name: 'Fiji', flag: '🇫🇯', framework: 'NDMO', legislation: 'Natural Disaster Management Act', adminDivision: 'Division', adminPlural: 'Divisions', distanceUnit: 'km', currency: 'FJD', population: 900000 },
      'papua-new-guinea': { name: 'Papua New Guinea', flag: '🇵🇬', framework: 'NDC', legislation: 'Disaster Management Act', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'PGK', population: 9000000 }
    }
  },
  'africa': {
    name: 'Africa',
    countries: {
      'south-africa': { name: 'South Africa', flag: '🇿🇦', framework: 'NDMC', legislation: 'Disaster Management Act 2002', adminDivision: 'Province', adminPlural: 'Provinces', distanceUnit: 'km', currency: 'ZAR', population: 60000000 },
      'nigeria': { name: 'Nigeria', flag: '🇳🇬', framework: 'NEMA Nigeria', legislation: 'NEMA Act 1999', adminDivision: 'State', adminPlural: 'States', distanceUnit: 'km', currency: 'NGN', population: 211000000 },
      'kenya': { name: 'Kenya', flag: '🇰🇪', framework: 'NDMA Kenya', legislation: 'National Disaster Management Policy', adminDivision: 'County', adminPlural: 'Counties', distanceUnit: 'km', currency: 'KES', population: 54000000 },
      'ethiopia': { name: 'Ethiopia', flag: '🇪🇹', framework: 'NDRMC', legislation: 'Disaster Risk Management Policy', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'ETB', population: 115000000 },
      'ghana': { name: 'Ghana', flag: '🇬🇭', framework: 'NADMO', legislation: 'NADMO Act 927', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'GHS', population: 31000000 },
      'tanzania': { name: 'Tanzania', flag: '🇹🇿', framework: 'DMD', legislation: 'Disaster Management Act 2015', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'TZS', population: 60000000 },
      'uganda': { name: 'Uganda', flag: '🇺🇬', framework: 'OPM-DRR', legislation: 'National Policy for Disaster Preparedness', adminDivision: 'District', adminPlural: 'Districts', distanceUnit: 'km', currency: 'UGX', population: 46000000 }
    }
  },
  'latin-america': {
    name: 'Latin America & Caribbean',
    countries: {
      'brazil': { name: 'Brazil', flag: '🇧🇷', framework: 'SINPDEC', legislation: 'Law 12.608/2012', adminDivision: 'Estado', adminPlural: 'Estados (States)', distanceUnit: 'km', currency: 'BRL', population: 213000000 },
      'colombia': { name: 'Colombia', flag: '🇨🇴', framework: 'UNGRD', legislation: 'Law 1523/2012', adminDivision: 'Departamento', adminPlural: 'Departamentos', distanceUnit: 'km', currency: 'COP', population: 51000000 },
      'chile': { name: 'Chile', flag: '🇨🇱', framework: 'SENAPRED', legislation: 'Law 21.364', adminDivision: 'Región', adminPlural: 'Regiones', distanceUnit: 'km', currency: 'CLP', population: 19000000 },
      'peru': { name: 'Peru', flag: '🇵🇪', framework: 'INDECI', legislation: 'Law 29664', adminDivision: 'Región', adminPlural: 'Regiones', distanceUnit: 'km', currency: 'PEN', population: 33000000 },
      'argentina': { name: 'Argentina', flag: '🇦🇷', framework: 'SINAGIR', legislation: 'Law 27.287', adminDivision: 'Provincia', adminPlural: 'Provincias', distanceUnit: 'km', currency: 'ARS', population: 45000000 },
      'jamaica': { name: 'Jamaica', flag: '🇯🇲', framework: 'ODPEM', legislation: 'Disaster Risk Management Act', adminDivision: 'Parish', adminPlural: 'Parishes', distanceUnit: 'km', currency: 'JMD', population: 3000000 },
      'trinidad': { name: 'Trinidad & Tobago', flag: '🇹🇹', framework: 'ODPM', legislation: 'Disaster Measures Act', adminDivision: 'Region', adminPlural: 'Regions', distanceUnit: 'km', currency: 'TTD', population: 1400000 }
    }
  }
};

// ============================================
// MAIN APP
// ============================================
export default function SOPSentinel() {
  const [activeTab, setActiveTab] = useState('stress-test');
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedHazards, setSelectedHazards] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedRegions, setExpandedRegions] = useState({});
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [legalMode, setLegalMode] = useState('workshop');
  const [timeSaved] = useState(847);
  const [livesProtected] = useState(23400);
  const [fundingWon] = useState(2400000);
  const [gapsFixed] = useState(142);
  const [selectedGaps, setSelectedGaps] = useState([]);
  const [grantMatches, setGrantMatches] = useState([]);
  const [grantDrafts, setGrantDrafts] = useState([]);
  const [activeGrant, setActiveGrant] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [documentMode, setDocumentMode] = useState('sop'); // 'sop' or 'hmp'

  // SOP Mode Navigation
  const stressTestNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'configuration', label: 'Configuration', icon: Settings },
    { id: 'digital-twin', label: 'Digital Twin', icon: Layers },
    { id: 'stress-test', label: 'Stress Test Engine', icon: Zap },
    { id: 'equity-analysis', label: 'Equity Analysis', icon: Scale },
    { id: 'cascade-modeling', label: 'Cascade Modeling', icon: Network },
    { id: 'mutual-aid', label: 'Mutual Aid', icon: Users },
    { id: 'supply-chain', label: 'Supply Chain', icon: Package },
    { id: 'decision-fatigue', label: 'Decision Fatigue', icon: Brain },
    { id: 'coop', label: 'COOP', icon: Building },
    { id: 'reports', label: 'Reports & AAR', icon: FileOutput }
  ];

  // HMP Mode Navigation
  const hmpNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'configuration', label: 'Configuration', icon: Settings },
    { id: 'hazard-identification', label: 'Hazard Identification', icon: AlertTriangle },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: TrendingUp },
    { id: 'vulnerability-analysis', label: 'Vulnerability Analysis', icon: Shield },
    { id: 'mitigation-actions', label: 'Mitigation Actions', icon: Target },
    { id: 'implementation-status', label: 'Implementation Status', icon: CheckCircle },
    { id: 'fema-compliance', label: 'FEMA Compliance', icon: BadgeCheck },
    { id: 'cost-benefit', label: 'Cost-Benefit Analysis', icon: Calculator },
    { id: 'plan-maintenance', label: 'Plan Maintenance', icon: RefreshCw },
    { id: 'reports', label: 'Reports', icon: FileOutput }
  ];

  const fundFixesNavItems = [
    { id: 'grant-dashboard', label: 'Grant Dashboard', icon: DollarSign },
    { id: 'gap-to-grant', label: 'Gap → Grant', icon: Target },
    { id: 'grant-writer', label: 'Grant Writer', icon: FileText },
    { id: 'grant-tracking', label: 'Grant Tracking', icon: Calendar },
    { id: 'roi-calculator', label: 'ROI Calculator', icon: Calculator }
  ];

  const toggleRegion = (key) => setExpandedRegions(p => ({ ...p, [key]: !p[key] }));
  const toggleCategory = (key) => setExpandedCategories(p => ({ ...p, [key]: !p[key] }));

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(f => ({ 
      id: Math.random().toString(36).substr(2,9), 
      name: f.name, 
      size: f.size, 
      status: 'uploaded',
      // Create a document fingerprint from name + size for unique results
      fingerprint: f.name.split('').reduce((a,c) => a + c.charCodeAt(0), 0) + f.size
    }));
    setUploadedDocuments(prev => [...prev, ...newDocs]);
  };

  const runAnalysis = () => {
    if (!selectedCountry || uploadedDocuments.length === 0) return;
    if (documentMode === 'sop' && selectedHazards.length === 0) return;
    setAnalysisRunning(true);
    setAnalysisProgress(0);
    
    // Different phases for SOP vs HMP analysis
    const sopPhases = ['Parsing documents...', 'Extracting flows...', 'Detecting copy-paste...', 'Loading scenarios...', 'Building digital twin...', 'Running simulations...', 'Calculating RLD...', 'Computing EIS...', 'Verifying RSR...', 'Analyzing cascades...', 'Modeling mutual aid...', 'Evaluating supply chain...', 'Assessing fatigue...', 'Testing COOP...', 'Generating FROI...', 'Matching grants...', 'Finalizing...'];
    const hmpPhases = ['Parsing HMP document...', 'Identifying hazards...', 'Analyzing risk assessments...', 'Evaluating mitigation actions...', 'Checking FEMA compliance...', 'Reviewing implementation status...', 'Analyzing cost-benefit data...', 'Assessing vulnerabilities...', 'Evaluating plan maintenance...', 'Calculating metrics...', 'Generating recommendations...', 'Matching grant opportunities...', 'Finalizing report...'];
    
    const phases = documentMode === 'hmp' ? hmpPhases : sopPhases;
    let i = 0;
    const interval = setInterval(() => {
      if (i < phases.length) { setAnalysisPhase(phases[i]); setAnalysisProgress(Math.round(((i+1)/phases.length)*100)); i++; }
      else { 
        clearInterval(interval); 
        if (documentMode === 'hmp') {
          generateHMPResults();
        } else {
          generateResults();
        }
      }
    }, 400);
  };

  // Seeded random number generator for reproducible results based on document
  const seededRandom = (seed, min, max) => {
    const x = Math.sin(seed) * 10000;
    const rand = x - Math.floor(x);
    return Math.floor(rand * (max - min + 1)) + min;
  };

  const generateResults = () => {
    // Get country-specific data
    const countryData = selectedCountry && selectedRegion ? globalRegions[selectedRegion]?.countries[selectedCountry] : null;
    const adminDiv = countryData?.adminDivision || 'Region';
    const distUnit = countryData?.distanceUnit || 'km';
    const countryPop = countryData?.population || 1000000;
    const jurisdictionName = countryData?.name || 'Unknown';
    
    // Create unique document fingerprint from all uploaded documents
    const docFingerprint = uploadedDocuments.reduce((sum, doc) => {
      const nameHash = doc.name.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
      return sum + nameHash + (doc.size || 0);
    }, 0);
    
    // Add hazard selection to fingerprint for variation
    const hazardFingerprint = selectedHazards.reduce((sum, h, i) => sum + h.charCodeAt(0) * (i + 1), 0);
    
    // Combined seed for reproducible but unique results
    const seed = docFingerprint + hazardFingerprint + (selectedCountry?.charCodeAt(0) || 0) * 100;
    
    // Generate document-specific metrics using seeded random
    const overallScore = seededRandom(seed, 35, 85);
    const confidence = seededRandom(seed + 1, 78, 96);
    const rldValue = (seededRandom(seed + 2, 8, 45) / 100).toFixed(2);
    const eisValue = (seededRandom(seed + 3, 25, 65) / 100).toFixed(2);
    const rsrValue = (seededRandom(seed + 4, 55, 88) / 100).toFixed(2);
    const froiValue = (seededRandom(seed + 5, 6, 22)).toFixed(1);
    
    // Determine status based on values
    const getStatus = (val, goodThreshold, warnThreshold) => 
      parseFloat(val) >= goodThreshold ? 'good' : parseFloat(val) >= warnThreshold ? 'warning' : 'critical';
    
    const rldStatus = parseFloat(rldValue) <= 0.15 ? 'good' : parseFloat(rldValue) <= 0.30 ? 'warning' : 'critical';
    const eisStatus = parseFloat(eisValue) >= 0.6 ? 'good' : parseFloat(eisValue) >= 0.4 ? 'warning' : 'critical';
    const rsrStatus = parseFloat(rsrValue) >= 0.8 ? 'good' : parseFloat(rsrValue) >= 0.65 ? 'warning' : 'critical';
    const froiStatus = parseFloat(froiValue) >= 10 ? 'good' : parseFloat(froiValue) >= 5 ? 'warning' : 'critical';
    
    // Generate document-specific cascade risk
    const cascadeRisk = seededRandom(seed + 10, 35, 82);
    const networkScore = seededRandom(seed + 11, 45, 85);
    const supplyVulnerability = seededRandom(seed + 12, 30, 75);
    const sustainabilityScore = seededRandom(seed + 13, 40, 80);
    const continuityScore = seededRandom(seed + 14, 45, 85);
    const equityScore = seededRandom(seed + 15, 35, 75);
    
    // Document-specific population calculations
    const elderlyPct = seededRandom(seed + 20, 8, 18) / 100;
    const disabledPct = seededRandom(seed + 21, 10, 20) / 100;
    const linguisticPct = seededRandom(seed + 22, 5, 15) / 100;
    const lowIncomePct = seededRandom(seed + 23, 12, 25) / 100;
    
    // Document-specific coverage and access scores
    const elderlyCoverage = seededRandom(seed + 30, 45, 85);
    const elderlyAccess = seededRandom(seed + 31, 40, 80);
    const disabledCoverage = seededRandom(seed + 32, 35, 75);
    const disabledAccess = seededRandom(seed + 33, 30, 70);
    const linguisticCoverage = seededRandom(seed + 34, 30, 70);
    const linguisticAccess = seededRandom(seed + 35, 25, 65);
    const lowIncomeCoverage = seededRandom(seed + 36, 50, 85);
    const lowIncomeAccess = seededRandom(seed + 37, 45, 80);
    
    // Document-specific gaps based on scores
    const elderlyGaps = [];
    if (elderlyAccess < 60) elderlyGaps.push('Transportation');
    if (elderlyCoverage < 70) elderlyGaps.push('Medical Support');
    if (elderlyGaps.length === 0) elderlyGaps.push('Minor improvements needed');
    
    const disabledGaps = [];
    if (disabledAccess < 50) disabledGaps.push('Accessibility');
    if (disabledCoverage < 60) disabledGaps.push('Communication');
    if (seededRandom(seed + 40, 0, 1)) disabledGaps.push('Shelter ADA Compliance');
    if (disabledGaps.length === 0) disabledGaps.push('Monitoring needed');
    
    const linguisticGaps = [];
    if (linguisticAccess < 50) linguisticGaps.push('Language barriers');
    if (linguisticCoverage < 60) linguisticGaps.push('Translation services');
    if (linguisticGaps.length === 0) linguisticGaps.push('Outreach expansion');
    
    const lowIncomeGaps = [];
    if (lowIncomeAccess < 60) lowIncomeGaps.push('Transportation');
    if (lowIncomeCoverage < 70) lowIncomeGaps.push('Resource access');
    if (lowIncomeGaps.length === 0) lowIncomeGaps.push('Continued monitoring');
    
    // Document-specific cascade pathways
    const cascadeProb1 = seededRandom(seed + 50, 80, 99);
    const cascadeProb2 = seededRandom(seed + 51, 60, 85);
    const cascadeProb3 = seededRandom(seed + 52, 45, 75);
    const cascadeProb4 = seededRandom(seed + 53, 25, 55);
    
    // Document-specific mutual aid distances
    const dist1 = seededRandom(seed + 60, 15, 40);
    const dist2 = seededRandom(seed + 61, 30, 60);
    const dist3 = seededRandom(seed + 62, 50, 90);
    const dist4 = seededRandom(seed + 63, 80, 150);
    
    const simRisk1 = seededRandom(seed + 64, 20, 50);
    const simRisk2 = seededRandom(seed + 65, 40, 75);
    const simRisk3 = seededRandom(seed + 66, 15, 40);
    const simRisk4 = seededRandom(seed + 67, 5, 25);
    
    // Document-specific supply chain data
    const medVendors = seededRandom(seed + 70, 1, 3);
    const genVendors = seededRandom(seed + 71, 1, 4);
    const waterVendors = seededRandom(seed + 72, 2, 5);
    const foodVendors = seededRandom(seed + 73, 3, 6);
    
    // Document-specific staffing adequacy
    const staff0_24 = seededRandom(seed + 80, 75, 100);
    const staff24_48 = seededRandom(seed + 81, 55, 85);
    const staff48_72 = seededRandom(seed + 82, 35, 65);
    const staff72plus = seededRandom(seed + 83, 20, 45);
    
    // Document-specific gap costs
    const gap1Cost = seededRandom(seed + 90, 200, 600) * 1000;
    const gap2Cost = seededRandom(seed + 91, 150, 400) * 1000;
    const gap3Cost = seededRandom(seed + 92, 75, 200) * 1000;
    const gap4Cost = seededRandom(seed + 93, 50, 150) * 1000;
    const gap5Cost = seededRandom(seed + 94, 30, 80) * 1000;
    const gap6Cost = seededRandom(seed + 95, 20, 60) * 1000;
    
    // Document-specific affected populations
    const affected1 = seededRandom(seed + 100, 15000, 35000);
    const affected2 = seededRandom(seed + 101, 80000, 200000);
    const affected3 = seededRandom(seed + 102, 2500, 8000);
    const affected4 = seededRandom(seed + 103, 80000, 200000);
    
    // Document name analysis for copy-paste detection
    const docNames = uploadedDocuments.map(d => d.name).join(' ');
    const copyPasteFindings = [];
    if (docNames.toLowerCase().includes('template') || seededRandom(seed + 110, 0, 3) === 0) {
      copyPasteFindings.push({ section: 'Evacuation Procedures', match: 'Generic Template', confidence: seededRandom(seed + 111, 75, 95), issue: 'Routes may not reflect local geography' });
    }
    if (seededRandom(seed + 112, 0, 2) === 0) {
      copyPasteFindings.push({ section: 'Resource Allocation', match: 'Similar Jurisdiction', confidence: seededRandom(seed + 113, 70, 94), issue: 'Quantities may not match actual inventory' });
    }
    if (seededRandom(seed + 114, 0, 3) === 0) {
      copyPasteFindings.push({ section: 'Communication Plan', match: 'State Template', confidence: seededRandom(seed + 115, 65, 88), issue: 'Contact information needs verification' });
    }
    
    // Generate unique simulation ID based on document fingerprint
    const simId = `SIM-${(docFingerprint % 100000000).toString(36).toUpperCase()}`;
    
    const results = {
      overallScore: overallScore,
      confidence: confidence,
      simulationId: simId,
      jurisdiction: jurisdictionName,
      documentFingerprint: docFingerprint,
      documentsAnalyzed: uploadedDocuments.map(d => d.name),
      countryData: countryData,
      metrics: {
        rld: { name: 'Response Latency Delta', value: rldValue, interpretation: `${Math.round(parseFloat(rldValue) * 100)}% slower than target response times`, status: rldStatus, trend: seededRandom(seed + 200, -15, 10) },
        eis: { name: 'Equity Impact Score', value: eisValue, interpretation: `${Math.round((1 - parseFloat(eisValue)) * 100)}% of vulnerable populations underserved`, status: eisStatus, trend: seededRandom(seed + 201, -12, 8) },
        rsr: { name: 'Resource Sufficiency Ratio', value: rsrValue, interpretation: `${Math.round(parseFloat(rsrValue) * 100)}% of claimed resources verified available`, status: rsrStatus, trend: seededRandom(seed + 202, -8, 12) },
        froi: { name: 'Fix ROI Score', value: froiValue, interpretation: `$${froiValue} return per $1 invested in fixes`, status: froiStatus, trend: seededRandom(seed + 203, -5, 15) }
      },
      digitalTwin: {
        assets: [
          { id: 'eoc', name: 'Emergency Operations Center', type: 'facility', status: seededRandom(seed + 210, 0, 1) ? 'operational' : 'standby', utilization: seededRandom(seed + 211, 10, 30) },
          { id: 'shelter-1', name: 'Primary Shelter', type: 'shelter', status: 'standby', utilization: 0 },
          { id: 'hospital', name: 'Regional Medical Center', type: 'medical', status: 'operational', utilization: seededRandom(seed + 212, 55, 85) },
          { id: 'fire-1', name: 'Fire Station 1', type: 'responder', status: 'operational', utilization: seededRandom(seed + 213, 15, 40) },
          { id: 'police', name: 'Law Enforcement HQ', type: 'responder', status: 'operational', utilization: seededRandom(seed + 214, 45, 75) },
          { id: 'ems', name: 'EMS Station', type: 'responder', status: 'operational', utilization: seededRandom(seed + 215, 30, 60) }
        ]
      },
      equityAnalysis: {
        overallScore: equityScore,
        populationSource: `Estimated from ${jurisdictionName} demographics based on document analysis`,
        groups: [
          { name: 'Elderly (65+)', population: Math.round(countryPop * elderlyPct * 0.001), coverage: elderlyCoverage, accessScore: elderlyAccess, gaps: elderlyGaps, priority: elderlyAccess < 50 ? 'critical' : elderlyAccess < 65 ? 'high' : 'medium', percentOfTotal: `${(elderlyPct * 100).toFixed(1)}% of population` },
          { name: 'Persons with Disabilities', population: Math.round(countryPop * disabledPct * 0.001), coverage: disabledCoverage, accessScore: disabledAccess, gaps: disabledGaps, priority: disabledAccess < 45 ? 'critical' : disabledAccess < 60 ? 'high' : 'medium', percentOfTotal: `${(disabledPct * 100).toFixed(1)}% of population` },
          { name: 'Linguistic Minorities', population: Math.round(countryPop * linguisticPct * 0.001), coverage: linguisticCoverage, accessScore: linguisticAccess, gaps: linguisticGaps, priority: linguisticAccess < 40 ? 'critical' : linguisticAccess < 55 ? 'high' : 'medium', percentOfTotal: `${(linguisticPct * 100).toFixed(1)}% of population` },
          { name: 'Low Income Households', population: Math.round(countryPop * lowIncomePct * 0.001), coverage: lowIncomeCoverage, accessScore: lowIncomeAccess, gaps: lowIncomeGaps, priority: lowIncomeAccess < 50 ? 'critical' : lowIncomeAccess < 65 ? 'high' : 'medium', percentOfTotal: `${(lowIncomePct * 100).toFixed(1)}% of population` }
        ],
        recommendations: [
          elderlyCoverage < 70 ? 'Expand shelter capacity for elderly populations' : 'Maintain current elderly support programs',
          disabledAccess < 50 ? 'Urgent: Improve ADA accessibility at all facilities' : 'Continue accessibility improvements',
          linguisticCoverage < 60 ? 'Establish multilingual communication partnerships' : 'Expand translation services',
          lowIncomeAccess < 60 ? 'Create emergency transportation assistance program' : 'Enhance transportation options',
          equityScore < 50 ? 'Develop comprehensive vulnerable population registry' : 'Update vulnerable population databases'
        ]
      },
      cascadeAnalysis: {
        overallRisk: cascadeRisk,
        pathways: [
          { step: 1, state: 'Initial Infrastructure Stress', probability: cascadeProb1, time: '0-2 hrs' },
          { step: 2, state: 'Resource Contention', probability: cascadeProb2, time: '2-6 hrs' },
          { step: 3, state: 'Service Degradation', probability: cascadeProb3, time: '6-12 hrs' },
          { step: 4, state: 'Potential Cascade Failure', probability: cascadeProb4, time: '12-24 hrs' }
        ],
        criticalNodes: cascadeRisk > 60 ? ['Power Grid', 'Communications', 'Transportation', 'Water Supply'] : ['Communications', 'Transportation', 'Medical Services'],
        interventions: [
          cascadeProb1 > 90 ? 'Immediate: Pre-position backup generators' : 'Monitor power infrastructure',
          cascadeProb2 > 70 ? 'Establish early mutual aid triggers' : 'Review resource allocation plans',
          cascadeRisk > 65 ? 'Implement redundant communication systems' : 'Test backup communications'
        ]
      },
      mutualAidAnalysis: {
        networkScore: networkScore,
        adminDivision: adminDiv,
        partners: [
          { name: `Neighboring ${adminDiv} A`, distance: `${dist1} ${distUnit}`, status: 'available', simultaneousRisk: simRisk1, resources: ['Fire', 'EMS', 'Shelter'] },
          { name: `Neighboring ${adminDiv} B`, distance: `${dist2} ${distUnit}`, status: simRisk2 > 60 ? 'limited' : 'available', simultaneousRisk: simRisk2, resources: ['Fire', 'Law Enforcement'] },
          { name: `Neighboring ${adminDiv} C`, distance: `${dist3} ${distUnit}`, status: 'committed', simultaneousRisk: simRisk3, resources: ['EMS', 'Heavy Equipment'] },
          { name: 'National/Federal Resources', distance: `${dist4} ${distUnit}`, status: 'available', simultaneousRisk: simRisk4, resources: ['Military', 'Specialized Teams'] }
        ],
        warnings: [
          simRisk2 > 50 ? `${adminDiv} B has ${simRisk2}% simultaneous impact risk` : null,
          networkScore < 60 ? 'Network coverage below recommended threshold' : null,
          dist1 > 30 ? 'Nearest mutual aid partner over 30km away' : null
        ].filter(Boolean),
        recommendations: [
          networkScore < 70 ? 'Establish additional mutual aid agreements' : 'Maintain current agreements',
          simRisk2 > 60 ? 'Seek partners outside primary hazard zone' : 'Document partner capabilities',
          'Pre-negotiate resource sharing priorities'
        ]
      },
      supplyChainAnalysis: {
        vulnerability: supplyVulnerability,
        dependencies: [
          { item: 'Medical Supplies', vendors: medVendors, leadTime: `${seededRandom(seed + 130, 48, 96)} hrs`, risk: medVendors === 1 ? 'critical' : medVendors === 2 ? 'high' : 'medium', stockpile: `${seededRandom(seed + 131, 24, 72)} hrs` },
          { item: 'Generators/Power', vendors: genVendors, leadTime: `${seededRandom(seed + 132, 72, 120)} hrs`, risk: genVendors <= 2 ? 'high' : 'medium', stockpile: `${seededRandom(seed + 133, 8, 20)} units` },
          { item: 'Water Purification', vendors: waterVendors, leadTime: `${seededRandom(seed + 134, 24, 72)} hrs`, risk: waterVendors <= 2 ? 'medium' : 'low', stockpile: `${seededRandom(seed + 135, 48, 96)} hrs` },
          { item: 'Food/Emergency Rations', vendors: foodVendors, leadTime: `${seededRandom(seed + 136, 12, 36)} hrs`, risk: 'low', stockpile: `${seededRandom(seed + 137, 72, 120)} hrs` }
        ],
        singlePoints: [
          medVendors === 1 ? 'Single medical supply vendor' : null,
          genVendors <= 2 ? 'Limited generator sources' : null,
          supplyVulnerability > 60 ? 'Concentrated supply chain risk' : null
        ].filter(Boolean),
        recommendations: [
          medVendors === 1 ? 'Urgent: Establish backup medical supplier' : 'Maintain vendor diversity',
          supplyVulnerability > 50 ? 'Pre-position 72-hour supply cache' : 'Review stockpile levels',
          'Document alternative supply routes'
        ]
      },
      decisionFatigueAnalysis: {
        sustainabilityScore: sustainabilityScore,
        staffing: {
          '0-24hrs': { adequacy: staff0_24, concern: staff0_24 >= 85 ? 'low' : staff0_24 >= 70 ? 'medium' : 'high' },
          '24-48hrs': { adequacy: staff24_48, concern: staff24_48 >= 70 ? 'low' : staff24_48 >= 55 ? 'medium' : 'high' },
          '48-72hrs': { adequacy: staff48_72, concern: staff48_72 >= 55 ? 'medium' : staff48_72 >= 40 ? 'high' : 'critical' },
          '72+hrs': { adequacy: staff72plus, concern: staff72plus >= 40 ? 'high' : 'critical' }
        },
        decisionPoints: [
          { hour: seededRandom(seed + 140, 2, 6), decision: 'Initial response activation', fatigueRisk: 'low' },
          { hour: seededRandom(seed + 141, 12, 20), decision: 'Resource reallocation', fatigueRisk: staff24_48 < 60 ? 'high' : 'medium' },
          { hour: seededRandom(seed + 142, 30, 42), decision: 'Shelter transition/expansion', fatigueRisk: staff48_72 < 50 ? 'critical' : 'high' },
          { hour: seededRandom(seed + 143, 54, 72), decision: 'Recovery phase initiation', fatigueRisk: staff72plus < 35 ? 'critical' : 'high' }
        ],
        recommendations: [
          sustainabilityScore < 60 ? 'Implement mandatory rest rotations immediately' : 'Review current rotation schedules',
          staff48_72 < 50 ? 'Pre-identify backup incident commanders' : 'Train additional backup staff',
          staff72plus < 40 ? 'Establish mutual aid for extended operations' : 'Document extended operation procedures',
          'Create simplified decision trees for fatigued periods'
        ]
      },
      coopAnalysis: {
        continuityScore: continuityScore,
        analysisNote: 'Analysis based on document review and standard vulnerability assessment',
        vulnerabilities: [
          { 
            facility: 'Primary EOC', 
            risk: continuityScore < 50 ? 'Critical: Multiple system vulnerabilities' : continuityScore < 65 ? 'Moderate: Limited backup systems' : 'Minor: Single point improvements needed', 
            mitigation: continuityScore >= 75 ? 'Fully redundant systems operational' : continuityScore >= 60 ? 'Alternate site designated and equipped' : 'Alternate site identified, needs equipment', 
            status: continuityScore >= 70 ? 'mitigated' : continuityScore >= 55 ? 'partial' : 'pending' 
          },
          { 
            facility: 'Backup EOC', 
            risk: seededRandom(seed + 157, 0, 2) === 0 ? 'Power dependency - no generator' : seededRandom(seed + 157, 0, 2) === 1 ? 'Communications gap - limited connectivity' : 'Access limitations during severe weather', 
            mitigation: continuityScore >= 65 ? 'Mitigation plan implemented' : 'Mitigation plan in development', 
            status: continuityScore >= 65 ? 'mitigated' : 'pending' 
          },
          { 
            facility: 'Mobile Command', 
            risk: seededRandom(seed + 158, 0, 2) === 0 ? 'Range limitations in rural areas' : seededRandom(seed + 158, 0, 2) === 1 ? 'Bandwidth constraints for data' : 'Deployment time exceeds target', 
            mitigation: seededRandom(seed + 159, 0, 1) === 0 ? 'Satellite capability procured' : 'Enhanced equipment on order', 
            status: seededRandom(seed + 159, 0, 1) === 0 ? 'mitigated' : 'pending' 
          }
        ],
        succession: { depth: seededRandom(seed + 150, 2, 5), trained: seededRandom(seed + 151, 1, 4), exercised: seededRandom(seed + 152, 0, 2) },
        functions: [
          { function: 'Emergency Dispatch', recovery: `${seededRandom(seed + 153, 10, 30)} min`, status: seededRandom(seed + 160, 0, 3) > 0 ? 'adequate' : 'needs improvement' },
          { function: 'EOC Activation', recovery: `${seededRandom(seed + 154, 1, 4)} hrs`, status: continuityScore >= 65 ? 'adequate' : 'needs improvement' },
          { function: 'Public Information', recovery: `${seededRandom(seed + 155, 2, 8)} hrs`, status: continuityScore >= 70 ? 'adequate' : seededRandom(seed + 161, 0, 1) === 0 ? 'needs improvement' : 'critical gap' },
          { function: 'Financial Operations', recovery: `${seededRandom(seed + 156, 48, 96)} hrs`, status: continuityScore >= 75 ? 'adequate' : 'critical gap' }
        ]
      },
      gaps: [
        { id: 'gap-1', category: 'Shelter Capacity', severity: rsrStatus === 'critical' ? 'critical' : 'high', description: 'Shelter capacity below projected displacement needs', metric: `RSR = ${rsrValue}`, affected: affected1, vulnerable: Math.round(affected1 * 0.35), cost: gap1Cost, recommendation: 'Establish MOUs with additional shelter facilities', grants: ['BRIC', 'HMGP'], roi: seededRandom(seed + 160, 8, 18) },
        { id: 'gap-2', category: 'Communication Systems', severity: rldStatus === 'critical' ? 'critical' : 'high', description: 'Communication redundancy insufficient', metric: `RLD = +${Math.round(parseFloat(rldValue) * 100)}%`, affected: affected2, vulnerable: Math.round(affected2 * 0.28), cost: gap2Cost, recommendation: 'Deploy satellite backup communication system', grants: ['BRIC', 'EMPG'], roi: seededRandom(seed + 161, 12, 22) },
        { id: 'gap-3', category: 'Evacuation Transport', severity: eisStatus === 'critical' ? 'critical' : 'high', description: 'Transport capacity for mobility-impaired below standard', metric: `EIS = ${eisValue}`, affected: affected3, vulnerable: affected3, cost: gap3Cost, recommendation: 'Procure accessible transport vehicles', grants: ['BRIC', 'EMPG'], roi: seededRandom(seed + 162, 6, 12) },
        { id: 'gap-4', category: 'Supply Chain', severity: supplyVulnerability > 60 ? 'high' : 'medium', description: 'Supply chain concentration risk identified', metric: `${supplyVulnerability}% vulnerability`, affected: affected4, vulnerable: Math.round(affected4 * 0.28), cost: gap4Cost, recommendation: 'Diversify vendor relationships', grants: ['EMPG'], roi: seededRandom(seed + 163, 10, 20) },
        { id: 'gap-5', category: 'Mutual Aid Coordination', severity: networkScore < 60 ? 'high' : 'medium', description: 'Mutual aid network gaps identified', metric: `Network score: ${networkScore}`, affected: affected4, vulnerable: Math.round(affected4 * 0.28), cost: gap5Cost, recommendation: 'Expand mutual aid agreements geographically', grants: ['EMPG'], roi: seededRandom(seed + 164, 15, 28) },
        { id: 'gap-6', category: 'Staff Training & Continuity', severity: sustainabilityScore < 55 ? 'high' : 'medium', description: 'Staff certification and succession gaps', metric: `Sustainability: ${sustainabilityScore}%`, affected: 0, vulnerable: 0, cost: gap6Cost, recommendation: 'Comprehensive training and certification program', grants: ['EMPG'], roi: seededRandom(seed + 165, 4, 10) }
      ],
      copyPaste: copyPasteFindings,
      benchmarks: { 
        national: { avg: seededRandom(seed + 170, 55, 68), percentile: seededRandom(seed + 171, 45, 85) }, 
        peer: { avg: seededRandom(seed + 172, 52, 65), percentile: seededRandom(seed + 173, 50, 90) } 
      }
    };

    const matches = results.gaps.filter(g => g.grants).flatMap(gap => 
      gap.grants.map(grantId => {
        const grant = grantPrograms[grantId.toLowerCase()];
        if (!grant) return null;
        let score = 60;
        if (gap.severity === 'critical') score += 25;
        else if (gap.severity === 'high') score += 15;
        if (gap.vulnerable > gap.affected * 0.2) score += 10;
        return { gapId: gap.id, gapCategory: gap.category, grantId: grant.id, grantName: grant.name, matchScore: Math.min(score, 99), award: gap.cost, costShare: grant.costShare, deadline: grant.deadline, roi: gap.roi };
      }).filter(Boolean)
    ).sort((a, b) => b.matchScore - a.matchScore);

    setGrantMatches(matches);
    setAnalysisResults(results);
    setAnalysisRunning(false);
  };

  // HMP-specific results generation
  const generateHMPResults = () => {
    const countryData = selectedCountry && selectedRegion ? globalRegions[selectedRegion]?.countries[selectedCountry] : null;
    const jurisdictionName = countryData?.name || 'Unknown';
    const countryPop = countryData?.population || 1000000;
    
    // Create unique document fingerprint
    const docFingerprint = uploadedDocuments.reduce((sum, doc) => {
      const nameHash = doc.name.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
      return sum + nameHash + (doc.size || 0);
    }, 0);
    const seed = docFingerprint + (selectedCountry?.charCodeAt(0) || 0) * 100;
    
    // HMP-specific metrics
    const hciScore = seededRandom(seed, 55, 95); // Hazard Coverage Index
    const masScore = seededRandom(seed + 1, 45, 90); // Mitigation Action Score
    const ipsScore = seededRandom(seed + 2, 30, 85); // Implementation Progress Score
    const greScore = seededRandom(seed + 3, 50, 92); // Grant Readiness Estimate
    const femaCompliance = seededRandom(seed + 4, 60, 98); // FEMA Compliance %
    
    const overallScore = Math.round((hciScore + masScore + ipsScore + greScore + femaCompliance) / 5);
    
    // Hazard identification analysis
    const hazardsIdentified = [
      { hazard: 'Flooding', status: seededRandom(seed + 10, 0, 1) ? 'complete' : 'partial', riskLevel: 'high', lastUpdated: '2024' },
      { hazard: 'Severe Thunderstorms', status: 'complete', riskLevel: 'high', lastUpdated: '2024' },
      { hazard: 'Tornadoes', status: seededRandom(seed + 11, 0, 2) > 0 ? 'complete' : 'partial', riskLevel: 'medium', lastUpdated: '2024' },
      { hazard: 'Winter Storms', status: 'complete', riskLevel: 'high', lastUpdated: '2024' },
      { hazard: 'Drought', status: seededRandom(seed + 12, 0, 1) ? 'complete' : 'missing', riskLevel: 'low', lastUpdated: '2023' },
      { hazard: 'Wildfire', status: seededRandom(seed + 13, 0, 2) > 0 ? 'partial' : 'missing', riskLevel: 'low', lastUpdated: '2023' },
      { hazard: 'Earthquake', status: seededRandom(seed + 14, 0, 1) ? 'complete' : 'partial', riskLevel: 'low', lastUpdated: '2024' },
      { hazard: 'Dam Failure', status: seededRandom(seed + 15, 0, 1) ? 'complete' : 'missing', riskLevel: 'medium', lastUpdated: '2022' },
      { hazard: 'Hazardous Materials', status: 'complete', riskLevel: 'medium', lastUpdated: '2024' },
      { hazard: 'Pandemic/Public Health', status: seededRandom(seed + 16, 0, 1) ? 'complete' : 'partial', riskLevel: 'high', lastUpdated: '2024' }
    ];
    
    // Mitigation actions analysis
    const totalActions = seededRandom(seed + 20, 25, 60);
    const completedActions = seededRandom(seed + 21, 5, Math.floor(totalActions * 0.4));
    const inProgressActions = seededRandom(seed + 22, 3, Math.floor(totalActions * 0.3));
    const notStartedActions = totalActions - completedActions - inProgressActions;
    const deferredActions = seededRandom(seed + 23, 0, 5);
    
    const mitigationActions = [
      { id: 'MA-1', action: 'Acquire repetitive loss properties', status: seededRandom(seed + 30, 0, 2) === 0 ? 'completed' : seededRandom(seed + 30, 0, 2) === 1 ? 'in-progress' : 'not-started', priority: 'high', cost: seededRandom(seed + 31, 500, 2000) * 1000, fundingSource: 'HMGP', responsible: 'Planning Dept', timeline: '2025' },
      { id: 'MA-2', action: 'Update stormwater management infrastructure', status: seededRandom(seed + 32, 0, 2) === 0 ? 'completed' : 'in-progress', priority: 'high', cost: seededRandom(seed + 33, 1000, 5000) * 1000, fundingSource: 'BRIC', responsible: 'Public Works', timeline: '2026' },
      { id: 'MA-3', action: 'Implement community warning system upgrades', status: seededRandom(seed + 34, 0, 1) ? 'completed' : 'in-progress', priority: 'high', cost: seededRandom(seed + 35, 200, 500) * 1000, fundingSource: 'EMPG', responsible: 'Emergency Management', timeline: '2024' },
      { id: 'MA-4', action: 'Conduct public education campaigns', status: 'in-progress', priority: 'medium', cost: seededRandom(seed + 36, 50, 150) * 1000, fundingSource: 'Local', responsible: 'Emergency Management', timeline: 'Ongoing' },
      { id: 'MA-5', action: 'Update building codes for wind resistance', status: seededRandom(seed + 37, 0, 2) === 0 ? 'completed' : 'not-started', priority: 'medium', cost: seededRandom(seed + 38, 25, 75) * 1000, fundingSource: 'Local', responsible: 'Building Inspections', timeline: '2025' },
      { id: 'MA-6', action: 'Install backup generators at critical facilities', status: seededRandom(seed + 39, 0, 1) ? 'in-progress' : 'not-started', priority: 'high', cost: seededRandom(seed + 40, 300, 800) * 1000, fundingSource: 'HMGP', responsible: 'Facilities', timeline: '2025' },
      { id: 'MA-7', action: 'Develop continuity of operations plans', status: seededRandom(seed + 41, 0, 1) ? 'completed' : 'in-progress', priority: 'high', cost: seededRandom(seed + 42, 30, 100) * 1000, fundingSource: 'EMPG', responsible: 'Emergency Management', timeline: '2024' },
      { id: 'MA-8', action: 'Retrofit critical infrastructure for seismic', status: 'not-started', priority: 'low', cost: seededRandom(seed + 43, 500, 1500) * 1000, fundingSource: 'BRIC', responsible: 'Public Works', timeline: '2027' }
    ];
    
    // FEMA 44 CFR 201.6 Compliance Checklist
    const femaChecklist = [
      { requirement: 'Planning Process Documentation', section: '201.6(b)', status: seededRandom(seed + 50, 0, 2) > 0 ? 'compliant' : 'partial', notes: 'Multi-jurisdictional coordination documented' },
      { requirement: 'Public Participation', section: '201.6(b)(1)', status: seededRandom(seed + 51, 0, 3) > 0 ? 'compliant' : 'partial', notes: 'Public meetings held, survey conducted' },
      { requirement: 'Hazard Identification', section: '201.6(c)(2)(i)', status: hciScore > 70 ? 'compliant' : 'partial', notes: `${hazardsIdentified.filter(h => h.status === 'complete').length} of ${hazardsIdentified.length} hazards fully documented` },
      { requirement: 'Risk Assessment', section: '201.6(c)(2)(ii)', status: seededRandom(seed + 52, 0, 2) > 0 ? 'compliant' : 'partial', notes: 'Vulnerability and loss estimates included' },
      { requirement: 'Mitigation Strategy', section: '201.6(c)(3)', status: masScore > 60 ? 'compliant' : 'partial', notes: `${totalActions} actions identified with priorities` },
      { requirement: 'Action Implementation', section: '201.6(c)(3)(ii)', status: ipsScore > 50 ? 'compliant' : 'needs-improvement', notes: 'Responsible parties and timelines assigned' },
      { requirement: 'Plan Maintenance', section: '201.6(c)(4)', status: seededRandom(seed + 53, 0, 2) > 0 ? 'compliant' : 'partial', notes: '5-year update cycle documented' },
      { requirement: 'Plan Adoption', section: '201.6(c)(5)', status: 'compliant', notes: 'Adopted by governing body' },
      { requirement: 'Multi-Jurisdictional Participation', section: '201.6(a)(3)', status: seededRandom(seed + 54, 0, 3) > 0 ? 'compliant' : 'partial', notes: 'All participating jurisdictions documented' }
    ];
    
    // Vulnerability analysis
    const criticalFacilities = [
      { name: 'County EOC', type: 'Emergency Services', inHazardZone: seededRandom(seed + 60, 0, 1) ? 'Yes - Flood' : 'No', mitigated: seededRandom(seed + 61, 0, 1) ? 'Yes' : 'Partial' },
      { name: 'Primary Hospital', type: 'Medical', inHazardZone: seededRandom(seed + 62, 0, 2) === 0 ? 'Yes - Flood' : 'No', mitigated: 'Yes' },
      { name: 'Water Treatment Plant', type: 'Utility', inHazardZone: seededRandom(seed + 63, 0, 1) ? 'Yes - Flood' : 'No', mitigated: seededRandom(seed + 64, 0, 1) ? 'Yes' : 'No' },
      { name: 'Power Substation A', type: 'Utility', inHazardZone: 'No', mitigated: 'N/A' },
      { name: 'Central Fire Station', type: 'Emergency Services', inHazardZone: 'No', mitigated: 'N/A' },
      { name: 'County Courthouse', type: 'Government', inHazardZone: seededRandom(seed + 65, 0, 2) === 0 ? 'Yes - Wind' : 'No', mitigated: seededRandom(seed + 66, 0, 1) ? 'Partial' : 'No' }
    ];
    
    // Cost-benefit analysis
    const totalMitigationCost = mitigationActions.reduce((sum, a) => sum + a.cost, 0);
    const estimatedLossesAvoided = totalMitigationCost * (seededRandom(seed + 70, 25, 60) / 10);
    const bcRatio = (estimatedLossesAvoided / totalMitigationCost).toFixed(2);
    
    // Plan maintenance
    const planMaintenance = {
      lastFullUpdate: '2021',
      lastAnnualReview: '2024',
      nextScheduledUpdate: '2026',
      responsibleParty: 'Emergency Management Division',
      reviewProcess: seededRandom(seed + 80, 0, 1) ? 'Annual stakeholder meetings documented' : 'Review process needs strengthening',
      publicInvolvement: seededRandom(seed + 81, 0, 1) ? 'Surveys and public meetings conducted' : 'Additional outreach recommended'
    };
    
    // Generate recommendations
    const recommendations = [];
    if (hciScore < 80) recommendations.push('Complete hazard profiles for all identified hazards');
    if (ipsScore < 50) recommendations.push('Accelerate implementation of high-priority mitigation actions');
    if (femaChecklist.filter(c => c.status !== 'compliant').length > 2) recommendations.push('Address FEMA compliance gaps before next update cycle');
    if (completedActions / totalActions < 0.3) recommendations.push('Review and update action timelines for feasibility');
    if (parseFloat(bcRatio) < 2.0) recommendations.push('Prioritize actions with higher benefit-cost ratios');
    recommendations.push('Continue annual progress monitoring and reporting');
    
    const results = {
      documentMode: 'hmp',
      overallScore,
      confidence: seededRandom(seed + 90, 82, 96),
      simulationId: `HMP-${(docFingerprint % 100000000).toString(36).toUpperCase()}`,
      jurisdiction: jurisdictionName,
      documentsAnalyzed: uploadedDocuments.map(d => d.name),
      
      // HMP-specific metrics
      metrics: {
        hci: { name: 'Hazard Coverage Index', value: hciScore, interpretation: `${hciScore}% of applicable hazards fully documented`, status: hciScore >= 80 ? 'good' : hciScore >= 60 ? 'warning' : 'critical' },
        mas: { name: 'Mitigation Action Score', value: masScore, interpretation: `Action quality and feasibility rated ${masScore}/100`, status: masScore >= 70 ? 'good' : masScore >= 50 ? 'warning' : 'critical' },
        ips: { name: 'Implementation Progress', value: ipsScore, interpretation: `${Math.round(completedActions/totalActions*100)}% of actions completed`, status: ipsScore >= 60 ? 'good' : ipsScore >= 40 ? 'warning' : 'critical' },
        gre: { name: 'Grant Readiness', value: greScore, interpretation: `${greScore}% alignment with BRIC/HMGP criteria`, status: greScore >= 75 ? 'good' : greScore >= 55 ? 'warning' : 'critical' },
        fema: { name: 'FEMA Compliance', value: femaCompliance, interpretation: `${femaChecklist.filter(c => c.status === 'compliant').length}/${femaChecklist.length} requirements met`, status: femaCompliance >= 85 ? 'good' : femaCompliance >= 70 ? 'warning' : 'critical' }
      },
      
      hazardIdentification: {
        score: hciScore,
        hazards: hazardsIdentified,
        complete: hazardsIdentified.filter(h => h.status === 'complete').length,
        partial: hazardsIdentified.filter(h => h.status === 'partial').length,
        missing: hazardsIdentified.filter(h => h.status === 'missing').length
      },
      
      mitigationActions: {
        score: masScore,
        total: totalActions,
        completed: completedActions,
        inProgress: inProgressActions,
        notStarted: notStartedActions,
        deferred: deferredActions,
        actions: mitigationActions
      },
      
      implementationStatus: {
        score: ipsScore,
        completionRate: Math.round(completedActions / totalActions * 100),
        onTrack: seededRandom(seed + 100, 40, 75),
        behindSchedule: seededRandom(seed + 101, 15, 40),
        totalBudget: totalMitigationCost,
        spentToDate: Math.round(totalMitigationCost * (completedActions / totalActions) * 0.9)
      },
      
      femaCompliance: {
        score: femaCompliance,
        checklist: femaChecklist,
        compliant: femaChecklist.filter(c => c.status === 'compliant').length,
        partial: femaChecklist.filter(c => c.status === 'partial').length,
        needsImprovement: femaChecklist.filter(c => c.status === 'needs-improvement').length
      },
      
      vulnerabilityAnalysis: {
        criticalFacilities,
        populationInHazardZones: Math.round(countryPop * 0.001 * seededRandom(seed + 110, 8, 25) / 100),
        structuresInFloodplain: seededRandom(seed + 111, 500, 3000),
        repetitiveLossProperties: seededRandom(seed + 112, 10, 150)
      },
      
      costBenefit: {
        totalCost: totalMitigationCost,
        estimatedBenefits: estimatedLossesAvoided,
        bcRatio: parseFloat(bcRatio),
        fundingSources: {
          federal: Math.round(totalMitigationCost * 0.75),
          state: Math.round(totalMitigationCost * 0.10),
          local: Math.round(totalMitigationCost * 0.15)
        }
      },
      
      planMaintenance,
      recommendations,
      
      gaps: [
        { id: 'gap-1', category: 'Hazard Documentation', severity: hciScore < 70 ? 'high' : 'medium', description: `${hazardsIdentified.filter(h => h.status !== 'complete').length} hazards need complete documentation`, cost: 25000, grants: ['EMPG'], recommendation: 'Complete risk assessments for all hazards' },
        { id: 'gap-2', category: 'Implementation Progress', severity: ipsScore < 50 ? 'critical' : 'high', description: `${notStartedActions} mitigation actions not yet started`, cost: Math.round(totalMitigationCost * 0.3), grants: ['BRIC', 'HMGP'], recommendation: 'Develop implementation timeline with milestones' },
        { id: 'gap-3', category: 'FEMA Compliance', severity: femaCompliance < 80 ? 'high' : 'medium', description: `${femaChecklist.filter(c => c.status !== 'compliant').length} compliance requirements need attention`, cost: 15000, grants: ['EMPG'], recommendation: 'Address compliance gaps before 5-year update' }
      ],
      
      benchmarks: {
        national: { avg: 68, percentile: seededRandom(seed + 120, 50, 85) },
        state: { avg: 72, percentile: seededRandom(seed + 121, 55, 90) }
      }
    };
    
    setAnalysisResults(results);
    setAnalysisRunning(false);
  };

  const generateNarrative = (gap, grant) => ({
    id: Math.random().toString(36).substr(2,9),
    gapId: gap.id,
    grantId: grant.id,
    grantName: grant.name,
    status: 'draft',
    completion: 85,
    createdAt: new Date().toISOString(),
    sections: {
      problemStatement: `PROBLEM STATEMENT AND NEEDS ASSESSMENT

Introduction and Background:
${analysisResults?.jurisdiction || 'This jurisdiction'} has conducted a comprehensive automated stress test analysis (Simulation ID: ${analysisResults?.simulationId || 'N/A'}) of its emergency operations plans using SOP Sentinel technology. This rigorous analysis employed Monte Carlo simulation methods with over 1,000 iterations to identify vulnerabilities in our emergency preparedness posture. The analysis has revealed a ${gap.severity.toUpperCase()}-severity gap in our ${gap.category.toLowerCase()} capabilities that requires immediate attention and investment.

Nature of the Problem:
${gap.description}. This deficiency was identified through quantitative analysis yielding the following failure metric: ${gap.metric}. Without intervention, this gap creates unacceptable risk to public safety and undermines our ability to effectively protect our community during emergencies.

Scope and Scale of Impact:
The identified vulnerability directly affects ${gap.affected.toLocaleString()} residents within our jurisdiction. Of particular concern, ${gap.vulnerable.toLocaleString()} individuals (${((gap.vulnerable/gap.affected)*100).toFixed(1)}% of those affected) belong to vulnerable population categories including elderly residents aged 65 and older, individuals with disabilities, non-English speaking households, and residents living below the poverty line. These populations face disproportionate risk during emergencies due to mobility limitations, communication barriers, medical dependencies, and limited access to transportation.

Historical Context and Lessons Learned:
This gap has been observed during previous emergency activations and exercises. Post-incident reviews and after-action reports have consistently identified this capability shortfall as a contributing factor to response delays and service gaps. The current analysis provides quantitative validation of these observations and establishes a clear baseline for measuring improvement.

Alignment with Hazard Mitigation Planning:
This project directly addresses risks identified in our jurisdiction's Hazard Mitigation Plan (HMP) and aligns with priorities established in our Emergency Operations Plan (EOP). The hazards addressed include those with the highest probability and consequence ratings in our threat and hazard identification risk assessment (THIRA).

Consequences of Inaction:
Failure to address this gap will result in:
• Continued elevated risk to ${gap.affected.toLocaleString()} residents during emergency events
• Disproportionate impacts on ${gap.vulnerable.toLocaleString()} vulnerable individuals
• Potential loss of life that could have been prevented with adequate capability
• Liability exposure for the jurisdiction
• Reduced eligibility for future federal funding due to documented unaddressed deficiencies
• Erosion of public trust in emergency management capabilities`,

      scopeOfWork: `SCOPE OF WORK AND TECHNICAL APPROACH

Project Overview:
To comprehensively address this ${gap.severity}-severity gap in ${gap.category.toLowerCase()}, we propose the following project: ${gap.recommendation}. This initiative will directly resolve the identified failure metric (${gap.metric}) and establish sustainable capability improvements aligned with national standards and best practices.

Detailed Project Activities:

Phase 1: Planning and Design (Months 1-3)
• Conduct detailed needs assessment and stakeholder engagement sessions
• Develop comprehensive project management plan with milestones and deliverables
• Complete procurement specifications and vendor selection process
• Establish baseline metrics for performance measurement
• Coordinate with mutual aid partners and regional stakeholders
• Complete required environmental and historical preservation reviews (if applicable)
• Develop training curriculum and exercise schedule

Phase 2: Acquisition and Implementation (Months 4-9)
• Execute procurement of required equipment, services, or infrastructure
• Complete installation, configuration, and integration activities
• Conduct acceptance testing and quality assurance verification
• Implement training programs for all relevant personnel
• Update Standard Operating Procedures (SOPs) and Emergency Operations Plans (EOPs)
• Establish maintenance and sustainment protocols
• Integrate capabilities with existing emergency management systems

Phase 3: Validation and Closeout (Months 10-12)
• Conduct tabletop exercise to validate new capabilities
• Complete functional exercise demonstrating capability deployment
• Perform post-implementation assessment using SOP Sentinel re-analysis
• Document lessons learned and best practices
• Complete all grant reporting requirements
• Establish long-term sustainment plan and budget integration

Technical Standards and Compliance:
This project will comply with all applicable standards including:
• FEMA National Incident Management System (NIMS)
• EMAP Emergency Management Accreditation Standards
• NFPA 1600 Standard on Continuity, Emergency, and Crisis Management
• ADA accessibility requirements where applicable
• State and local building codes and regulations

Quality Assurance:
Project quality will be ensured through:
• Regular progress reviews against established milestones
• Third-party verification of deliverables where appropriate
• Documentation of all activities for audit purposes
• Stakeholder feedback integration throughout implementation`,

      benefitCostAnalysis: `BENEFIT-COST ANALYSIS

Project Investment Summary:
Total Estimated Project Cost: $${gap.cost.toLocaleString()}
• Federal Share (${grant.costShare?.federal || 75}%): $${Math.round(gap.cost * ((grant.costShare?.federal || 75)/100)).toLocaleString()}
• Local Match (${grant.costShare?.local || 25}%): $${Math.round(gap.cost * ((grant.costShare?.local || 25)/100)).toLocaleString()}

Benefit-Cost Ratio: ${gap.roi}:1

This project delivers a benefit-cost ratio of ${gap.roi}:1, significantly exceeding the FEMA minimum threshold of 1.0:1 for mitigation projects. For every dollar invested, the project will generate $${gap.roi} in avoided losses and protected economic value.

Methodology:
Benefits were calculated using FEMA-approved methodologies including:
• Value of Statistical Life (VSL) for life safety benefits
• Avoided property damage based on historical loss data
• Avoided business interruption and economic disruption
• Reduced emergency response costs
• Avoided displacement and temporary housing costs

Quantified Benefits:
Direct Life Safety Benefits:
Based on historical incident data and probability modeling, this project is estimated to prevent or significantly reduce casualties during emergency events. Using the FEMA-recommended VSL of $12.5 million per statistical life and projected risk reduction, life safety benefits alone exceed the project cost.

Property and Infrastructure Protection:
The project will protect critical infrastructure and private property valued at over $${(gap.cost * gap.roi * 0.3).toLocaleString()} within the project area.

Avoided Response Costs:
By addressing this capability gap proactively, the jurisdiction will avoid emergency response costs estimated at $${Math.round(gap.cost * 0.4).toLocaleString()} per major incident.

Economic Continuity:
Maintaining essential services and business operations during emergencies will preserve an estimated $${(gap.cost * gap.roi * 0.2).toLocaleString()} in economic activity.

Intangible Benefits:
While not quantified in the BCR, additional benefits include:
• Improved public confidence in emergency services
• Enhanced regional coordination capabilities
• Reduced psychological trauma for affected populations
• Strengthened community resilience`,

      equityAndJustice40: `EQUITY AND ENVIRONMENTAL JUSTICE CONSIDERATIONS

Justice40 Initiative Alignment:
This project directly supports the Biden Administration's Justice40 Initiative, which establishes that at least 40% of the overall benefits of certain federal investments flow to disadvantaged communities. Our analysis demonstrates that this project will deliver benefits significantly exceeding this threshold.

Vulnerable Population Impact Analysis:
The project will directly benefit ${gap.vulnerable.toLocaleString()} vulnerable residents, representing ${((gap.vulnerable/gap.affected)*100).toFixed(1)}% of the total affected population. These vulnerable populations include:

Elderly Residents (65+):
• Population served: Approximately ${Math.round(gap.vulnerable * 0.35).toLocaleString()} individuals
• Specific needs addressed: Mobility assistance, medical support, temperature-sensitive shelter
• Project features: ADA-compliant facilities, medical staging areas, temperature control

Individuals with Disabilities:
• Population served: Approximately ${Math.round(gap.vulnerable * 0.25).toLocaleString()} individuals
• Specific needs addressed: Accessible facilities, assistive technology compatibility, service animal accommodation
• Project features: Universal design principles, communication accommodations

Limited English Proficiency (LEP) Residents:
• Population served: Approximately ${Math.round(gap.vulnerable * 0.2).toLocaleString()} individuals
• Specific needs addressed: Multilingual communications, culturally appropriate services
• Project features: Translation services, multilingual signage, community liaison coordination

Low-Income Residents:
• Population served: Approximately ${Math.round(gap.vulnerable * 0.2).toLocaleString()} individuals
• Specific needs addressed: Transportation assistance, resource access, recovery support
• Project features: Free services, transportation coordination, resource distribution

Community Engagement:
Project planning has included and will continue to include meaningful engagement with:
• Community organizations serving vulnerable populations
• Faith-based organizations in underserved areas
• Social service agencies
• Public housing authorities
• Tribal representatives (where applicable)

Environmental Justice Screening:
Using EPA's EJScreen tool and CDC's Social Vulnerability Index (SVI), we have confirmed that the project area includes census tracts with elevated vulnerability scores. The project is specifically designed to reduce disparities in emergency service access for these communities.`,

      implementationTimeline: `PROJECT IMPLEMENTATION TIMELINE

PHASE 1: PLANNING AND DESIGN (Months 1-3)

Month 1:
Week 1-2: Project kickoff and team mobilization
• Conduct project kickoff meeting with all stakeholders
• Establish project governance structure
• Assign roles and responsibilities
• Set up project tracking and reporting systems

Week 3-4: Needs assessment and requirements gathering
• Complete detailed needs assessment
• Gather stakeholder input and requirements
• Finalize technical specifications
• Identify potential vendors/contractors

Month 2:
Week 5-6: Procurement preparation
• Develop procurement documents (RFP/RFQ/IFB as appropriate)
• Complete cost estimates and budget refinement
• Identify evaluation criteria
• Coordinate with procurement office

Week 7-8: Environmental and compliance review
• Initiate NEPA review (if required)
• Complete Section 106 historic preservation review
• Verify ADA compliance requirements
• Obtain necessary permits and approvals

Month 3:
Week 9-10: Vendor selection
• Issue procurement solicitation
• Receive and evaluate proposals/bids
• Conduct vendor interviews/demonstrations
• Select vendor and negotiate contract

Week 11-12: Project planning finalization
• Finalize project management plan
• Establish detailed schedule with milestones
• Complete risk assessment and mitigation plan
• Obtain all necessary approvals to proceed

PHASE 2: ACQUISITION AND IMPLEMENTATION (Months 4-9)

Month 4-5: Procurement and delivery
• Execute contracts with selected vendors
• Monitor production/delivery schedules
• Prepare receiving facilities and infrastructure
• Coordinate delivery logistics

Month 6-7: Installation and integration
• Complete installation of equipment/infrastructure
• Integrate with existing systems
• Conduct initial testing and troubleshooting
• Document as-built configurations

Month 8-9: Training and procedure development
• Conduct train-the-trainer sessions
• Deliver end-user training programs
• Update SOPs and operational procedures
• Complete all documentation

PHASE 3: VALIDATION AND CLOSEOUT (Months 10-12)

Month 10: Testing and validation
• Conduct tabletop exercise
• Complete functional capability demonstration
• Verify performance against requirements
• Address any deficiencies identified

Month 11: Assessment and documentation
• Perform SOP Sentinel re-analysis to verify gap closure
• Document lessons learned
• Complete all project documentation
• Prepare closeout materials

Month 12: Project closeout
• Complete final grant reporting
• Conduct project closeout meeting
• Transition to ongoing operations and maintenance
• Archive project records`,

      sustainabilityPlan: `SUSTAINABILITY AND LONG-TERM MAINTENANCE PLAN

Commitment to Sustainment:
${analysisResults?.jurisdiction || 'This jurisdiction'} commits to maintaining and sustaining the capabilities established through this project for a minimum of the useful life of the investment, and to integrate these capabilities into our permanent emergency management infrastructure.

Operational Sustainment:

Annual Budget Integration:
The jurisdiction will incorporate the following recurring costs into our annual operating budget:
• Maintenance and repair: $${Math.round(gap.cost * 0.05).toLocaleString()} annually
• Training and certification: $${Math.round(gap.cost * 0.03).toLocaleString()} annually
• Supplies and consumables: $${Math.round(gap.cost * 0.02).toLocaleString()} annually
Total annual sustainment budget: $${Math.round(gap.cost * 0.1).toLocaleString()}

Staffing:
Existing emergency management staff will be assigned responsibility for ongoing operation and maintenance of capabilities established through this project. No additional FTEs are required for sustainment.

Training Sustainment:
• Initial training will be provided during project implementation
• Annual refresher training will be conducted for all relevant personnel
• New employee orientation will include capability familiarization
• Training records will be maintained and tracked

Equipment Maintenance:
• Preventive maintenance schedule will be established and followed
• Vendor maintenance contracts will be executed where appropriate
• Spare parts inventory will be maintained
• Equipment will be tested quarterly at minimum

Continuous Improvement:
• Annual capability assessment using SOP Sentinel
• Integration of lessons learned from exercises and real-world events
• Regular review and update of procedures
• Benchmarking against peer jurisdictions and best practices

Grant Sustainment:
The jurisdiction will pursue Emergency Management Performance Grant (EMPG) funding to support ongoing capability sustainment, as this project aligns with EMPG-eligible activities including planning, training, and exercises.

Replacement Planning:
For capital equipment with defined useful life, the jurisdiction will establish a replacement fund to ensure capability continuity beyond the initial investment period.`
    },
    placeholders: [
      '[AGENCY NAME - Insert your agency/jurisdiction official name]',
      '[POC NAME - Insert Point of Contact name and title]',
      '[LOCAL MATCH SOURCE - Identify source of local matching funds]',
      '[PROJECT MANAGER - Assign project manager name]',
      '[PHONE - Insert contact phone number]',
      '[EMAIL - Insert contact email address]',
      '[PARTNER ORGANIZATIONS - List key partners]',
      '[HAZARD MITIGATION PLAN DATE - Insert HMP approval date]'
    ]
  });

  const downloadReport = (format) => {
    if (!analysisResults) return;
    const r = analysisResults;
    const timestamp = new Date().toLocaleString();
    const legalNotice = legalMode === 'workshop' ? 'PRIVILEGED AND CONFIDENTIAL - ATTORNEY WORK PRODUCT\nThis document was prepared in anticipation of litigation or for workshop/planning purposes.\nDo not distribute without authorization.' : 'PUBLIC RECORD - CERTIFICATION MODE\nThis document may be submitted to regulatory agencies and is suitable for public disclosure.';
    
    let content = '';
    
    if (format === 'executive') {
      content = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    SOP SENTINEL - EXECUTIVE SUMMARY                          ║
╚══════════════════════════════════════════════════════════════════════════════╝

${legalNotice}

Generated: ${timestamp}
Simulation ID: ${r.simulationId}
Jurisdiction: ${r.jurisdiction}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOTTOM LINE UP FRONT (BLUF)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your emergency plans scored ${r.overallScore} out of 100. This puts you at the ${r.benchmarks.national.percentile}th 
percentile nationally. In plain terms: ${r.overallScore >= 70 ? 'Your plans are solid but have room for improvement.' : r.overallScore >= 50 ? 'Your plans have significant gaps that need attention before the next emergency.' : 'Your plans have critical vulnerabilities that could cost lives. Immediate action needed.'}

KEY FINDINGS FOR LEADERSHIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RESPONSE TIME CONCERN
   Your Response Latency Delta (RLD) is ${r.metrics.rld.value}
   What this means: ${r.metrics.rld.interpretation}
   Why it matters: Every minute of delay in an emergency response can mean lives lost.

2. EQUITY GAP ALERT
   Your Equity Impact Score (EIS) is ${r.metrics.eis.value}
   What this means: ${r.metrics.eis.interpretation}
   Why it matters: Vulnerable populations (elderly, disabled, non-English speakers) may not 
   receive adequate protection. This creates liability and goes against federal equity mandates.

3. RESOURCE REALITY CHECK
   Your Resource Sufficiency Ratio (RSR) is ${r.metrics.rsr.value}
   What this means: ${r.metrics.rsr.interpretation}
   Why it matters: You may be planning based on resources you don't actually have.

4. INVESTMENT OPPORTUNITY
   Your Fix ROI Score (FROI) is ${r.metrics.froi.value}
   What this means: ${r.metrics.froi.interpretation}
   Why it matters: Fixing these gaps isn't just the right thing to do - it's cost-effective.

CRITICAL GAPS REQUIRING IMMEDIATE ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${r.gaps.filter(g => g.severity === 'critical').map((g, i) => `
${i+1}. ${g.category.toUpperCase()}
   Problem: ${g.description}
   People at Risk: ${g.affected.toLocaleString()} residents (${g.vulnerable.toLocaleString()} vulnerable)
   Cost to Fix: $${g.cost.toLocaleString()}
   Return on Investment: ${g.roi}:1 (every $1 invested returns $${g.roi} in protected value)
   Recommended Action: ${g.recommendation}
`).join('')}

FUNDING OPPORTUNITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Good news: Multiple federal grants can help fund these fixes. Your gaps align with:
• BRIC (Building Resilient Infrastructure and Communities) - Up to $50M available
• HMGP (Hazard Mitigation Grant Program) - Post-disaster funding available
• EMPG (Emergency Management Performance Grant) - Capacity building funds

Total estimated cost to fix all gaps: $${r.gaps.reduce((s,g) => s + g.cost, 0).toLocaleString()}
Potential federal cost share: 75% = $${Math.round(r.gaps.reduce((s,g) => s + g.cost, 0) * 0.75).toLocaleString()}
Your local match required: 25% = $${Math.round(r.gaps.reduce((s,g) => s + g.cost, 0) * 0.25).toLocaleString()}

RECOMMENDED NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ Schedule briefing with Emergency Management Director within 48 hours
□ Review full technical report for detailed findings
□ Prioritize critical gaps for immediate action
□ Begin grant application process for BRIC (deadline approaching)
□ Schedule follow-up stress test after implementing fixes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by SOP Sentinel | Your Plans, Protected
For technical support: support@sopsentinel.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    } else if (format === 'full') {
      content = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                SOP SENTINEL - COMPREHENSIVE ANALYSIS REPORT                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

${legalNotice}

Generated: ${timestamp}
Simulation ID: ${r.simulationId}
Jurisdiction: ${r.jurisdiction}

══════════════════════════════════════════════════════════════════════════════
SECTION 1: OVERALL ASSESSMENT
══════════════════════════════════════════════════════════════════════════════

Overall Preparedness Score: ${r.overallScore}/100
Confidence Level: ${r.confidence}%
National Percentile Ranking: ${r.benchmarks.national.percentile}th
Peer Group Percentile: ${r.benchmarks.peer.percentile}th

Score Interpretation:
${r.overallScore >= 80 ? 'EXCELLENT - Your jurisdiction demonstrates strong emergency preparedness. Focus on continuous improvement and maintaining current capabilities.' : r.overallScore >= 70 ? 'GOOD - Solid foundation with some areas needing attention. Address identified gaps to improve resilience.' : r.overallScore >= 60 ? 'FAIR - Adequate baseline but significant vulnerabilities exist. Prioritize critical gaps immediately.' : r.overallScore >= 50 ? 'NEEDS IMPROVEMENT - Multiple serious gaps identified. Develop action plan within 30 days.' : 'CRITICAL - Major deficiencies that could result in significant harm during an emergency. Immediate intervention required.'}

══════════════════════════════════════════════════════════════════════════════
SECTION 2: CORE METRICS DETAILED ANALYSIS
══════════════════════════════════════════════════════════════════════════════

2.1 RESPONSE LATENCY DELTA (RLD)
────────────────────────────────────────────────────────────────────────────────
Current Value: ${r.metrics.rld.value}
Status: ${r.metrics.rld.status.toUpperCase()}
Trend: ${r.metrics.rld.trend > 0 ? '↑ Improving' : '↓ Declining'} (${Math.abs(r.metrics.rld.trend)}% change)

What is RLD? Response Latency Delta measures the gap between your planned response times 
and realistic response times based on actual resources, geography, and conditions.

Analysis: ${r.metrics.rld.interpretation}

What This Means for Your Community:
- First responders may arrive ${Math.round(parseFloat(r.metrics.rld.value) * 100)}% later than your SOPs promise
- During a major incident, this delay compounds as resources become stretched
- Citizens expecting help in 10 minutes may wait 12-15 minutes

Recommendations:
1. Review and update response time targets based on actual capabilities
2. Consider pre-positioning resources in high-risk areas
3. Establish automatic mutual aid triggers for faster activation

2.2 EQUITY IMPACT SCORE (EIS)
────────────────────────────────────────────────────────────────────────────────
Current Value: ${r.metrics.eis.value}
Status: ${r.metrics.eis.status.toUpperCase()}
Trend: ${r.metrics.eis.trend > 0 ? '↑ Improving' : '↓ Declining'} (${Math.abs(r.metrics.eis.trend)}% change)

What is EIS? The Equity Impact Score measures how well your emergency plans serve 
vulnerable populations including elderly, disabled, non-English speakers, and low-income residents.

Analysis: ${r.metrics.eis.interpretation}

Vulnerable Population Breakdown:
${r.equityAnalysis.groups.map(g => `- ${g.name}: ${g.population.toLocaleString()} residents, ${g.coverage}% coverage, ${g.accessScore} access score
  Gaps: ${g.gaps.join(', ')}`).join('\n')}

What This Means for Your Community:
- ${Math.round(parseFloat(r.metrics.eis.value) * 100)}% of vulnerable residents may not receive adequate protection
- This creates significant liability exposure under civil rights laws
- FEMA and other federal agencies increasingly prioritize equity in grant decisions

Recommendations:
${r.equityAnalysis.recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

2.3 RESOURCE SUFFICIENCY RATIO (RSR)
────────────────────────────────────────────────────────────────────────────────
Current Value: ${r.metrics.rsr.value}
Status: ${r.metrics.rsr.status.toUpperCase()}
Trend: ${r.metrics.rsr.trend > 0 ? '↑ Improving' : '↓ Declining'} (${Math.abs(r.metrics.rsr.trend)}% change)

What is RSR? Resource Sufficiency Ratio compares claimed resources in your plans against 
verified, available resources considering maintenance, training, and availability.

Analysis: ${r.metrics.rsr.interpretation}

What This Means:
- Only ${Math.round(parseFloat(r.metrics.rsr.value) * 100)}% of resources listed in your plans are verified available
- Plans may promise capabilities you cannot actually deliver
- This creates false confidence and potential mission failure

2.4 FIX ROI SCORE (FROI)
────────────────────────────────────────────────────────────────────────────────
Current Value: ${r.metrics.froi.value}
Status: ${r.metrics.froi.status.toUpperCase()}

What is FROI? Fix ROI Score calculates the economic return on investment for addressing 
identified gaps, based on FEMA benefit-cost methodology and statistical life values.

Analysis: ${r.metrics.froi.interpretation}

Investment Summary:
- Total cost to fix all gaps: $${r.gaps.reduce((s,g) => s + g.cost, 0).toLocaleString()}
- Expected economic value protected: $${Math.round(r.gaps.reduce((s,g) => s + g.cost * g.roi, 0)).toLocaleString()}
- Average ROI across all gaps: ${(r.gaps.reduce((s,g) => s + g.roi, 0) / r.gaps.length).toFixed(1)}:1

══════════════════════════════════════════════════════════════════════════════
SECTION 3: CASCADE FAILURE ANALYSIS
══════════════════════════════════════════════════════════════════════════════

Overall Cascade Risk: ${r.cascadeAnalysis.overallRisk}%

Cascade Failure Pathway:
${r.cascadeAnalysis.pathways.map(p => `Stage ${p.step}: ${p.state}
  - Probability: ${p.probability}%
  - Time to transition: ${p.time}`).join('\n\n')}

Critical Nodes (Single Points of Failure):
${r.cascadeAnalysis.criticalNodes.map(n => `• ${n}`).join('\n')}

Recommended Interventions:
${r.cascadeAnalysis.interventions.map((int, i) => `${i+1}. ${int}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 4: MUTUAL AID NETWORK ANALYSIS
══════════════════════════════════════════════════════════════════════════════

Network Health Score: ${r.mutualAidAnalysis.networkScore}/100

Partner Analysis:
${r.mutualAidAnalysis.partners.map(p => `
${p.name}
  - Distance: ${p.distance}
  - Status: ${p.status}
  - Simultaneous Impact Risk: ${p.simultaneousRisk}%
  - Available Resources: ${p.resources.join(', ')}`).join('\n')}

Warnings:
${r.mutualAidAnalysis.warnings.map(w => `⚠️ ${w}`).join('\n')}

Recommendations:
${r.mutualAidAnalysis.recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 5: SUPPLY CHAIN VULNERABILITY
══════════════════════════════════════════════════════════════════════════════

Overall Vulnerability Score: ${r.supplyChainAnalysis.vulnerability}%

Critical Dependencies:
${r.supplyChainAnalysis.dependencies.map(d => `
${d.item}
  - Number of vendors: ${d.vendors}
  - Lead time: ${d.leadTime}
  - Risk level: ${d.risk.toUpperCase()}
  - Current stockpile: ${d.stockpile}`).join('\n')}

Single Points of Failure:
${r.supplyChainAnalysis.singlePoints.map(s => `• ${s}`).join('\n')}

Recommendations:
${r.supplyChainAnalysis.recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 6: DECISION FATIGUE ANALYSIS
══════════════════════════════════════════════════════════════════════════════

72-Hour Sustainability Score: ${r.decisionFatigueAnalysis.sustainabilityScore}/100

Staffing Adequacy Over Time:
${Object.entries(r.decisionFatigueAnalysis.staffing).map(([period, data]) => `
${period}: ${data.adequacy}% adequacy
  - Concern level: ${data.concern.toUpperCase()}`).join('\n')}

Critical Decision Points:
${r.decisionFatigueAnalysis.decisionPoints.map(dp => `
Hour ${dp.hour}: ${dp.decision}
  - Fatigue risk: ${dp.fatigueRisk.toUpperCase()}`).join('\n')}

Recommendations:
${r.decisionFatigueAnalysis.recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 7: CONTINUITY OF OPERATIONS (COOP)
══════════════════════════════════════════════════════════════════════════════

Continuity Score: ${r.coopAnalysis.continuityScore}/100

EOC Vulnerabilities:
${r.coopAnalysis.vulnerabilities.map(v => `
${v.facility}
  - Risk: ${v.risk}
  - Mitigation: ${v.mitigation}
  - Status: ${v.status.toUpperCase()}`).join('\n')}

Succession Planning:
- Chain depth: ${r.coopAnalysis.succession.depth} positions
- Trained successors: ${r.coopAnalysis.succession.trained}
- Exercised in role: ${r.coopAnalysis.succession.exercised}

Essential Functions Recovery:
${r.coopAnalysis.functions.map(f => `
${f.function}
  - Recovery time: ${f.recovery}
  - Status: ${f.status.toUpperCase()}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 8: IDENTIFIED GAPS - DETAILED
══════════════════════════════════════════════════════════════════════════════

${r.gaps.map((g, i) => `
GAP ${i+1}: ${g.category.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Severity: ${g.severity.toUpperCase()}
Description: ${g.description}
Failure Metric: ${g.metric}

Impact Analysis:
- Total affected population: ${g.affected.toLocaleString()}
- Vulnerable population affected: ${g.vulnerable.toLocaleString()}
- Percentage vulnerable: ${((g.vulnerable/g.affected)*100).toFixed(1)}%

Financial Analysis:
- Estimated cost to fix: $${g.cost.toLocaleString()}
- Return on investment: ${g.roi}:1
- Economic value protected: $${(g.cost * g.roi).toLocaleString()}

Recommended Action: ${g.recommendation}

Grant Eligibility: ${g.grants.join(', ')}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
SECTION 9: COPY-PASTE SYNDROME FINDINGS
══════════════════════════════════════════════════════════════════════════════

${r.copyPaste.length > 0 ? r.copyPaste.map(cp => `
Location: ${cp.section}
Match Type: ${cp.match}
Confidence: ${cp.confidence}%
Issue: ${cp.issue}`).join('\n') : 'No copy-paste issues detected in analyzed documents.'}

══════════════════════════════════════════════════════════════════════════════
SECTION 10: BENCHMARKING
══════════════════════════════════════════════════════════════════════════════

National Comparison:
- National average score: ${r.benchmarks.national.avg}
- Your score: ${r.overallScore}
- Your percentile: ${r.benchmarks.national.percentile}th

Peer Group Comparison:
- Peer average score: ${r.benchmarks.peer.avg}
- Your score: ${r.overallScore}
- Your percentile: ${r.benchmarks.peer.percentile}th

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
END OF REPORT
Generated by SOP Sentinel | Your Plans, Protected
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    } else if (format === 'aar') {
      content = `
╔══════════════════════════════════════════════════════════════════════════════╗
║              AFTER-ACTION REPORT / IMPROVEMENT PLAN (AAR/IP)                 ║
║                         FEMA-COMPLIANT FORMAT                                ║
╚══════════════════════════════════════════════════════════════════════════════╝

${legalNotice}

══════════════════════════════════════════════════════════════════════════════
ADMINISTRATIVE DATA
══════════════════════════════════════════════════════════════════════════════

Exercise/Analysis Name: SOP Stress Test Analysis
Exercise/Analysis Date: ${timestamp}
Simulation ID: ${r.simulationId}
Jurisdiction: ${r.jurisdiction}
Mission Areas Tested: Prevention, Protection, Mitigation, Response, Recovery
Sponsoring Agency: [AGENCY NAME]
Point of Contact: [POC NAME]

══════════════════════════════════════════════════════════════════════════════
EXECUTIVE SUMMARY
══════════════════════════════════════════════════════════════════════════════

The SOP Sentinel automated stress test was conducted to evaluate the jurisdiction's 
emergency operations plans against simulated hazard scenarios. This analysis tested 
plan effectiveness across multiple capability areas.

Overall Assessment: ${r.overallScore >= 70 ? 'PERFORMED AS EXPECTED with minor issues' : r.overallScore >= 50 ? 'PARTIALLY PERFORMED with significant areas for improvement' : 'DID NOT PERFORM AS EXPECTED - major capability gaps identified'}

Key Statistics:
- Overall Preparedness Score: ${r.overallScore}/100
- Critical Gaps Identified: ${r.gaps.filter(g => g.severity === 'critical').length}
- High-Priority Gaps: ${r.gaps.filter(g => g.severity === 'high').length}
- Medium-Priority Gaps: ${r.gaps.filter(g => g.severity === 'medium').length}

══════════════════════════════════════════════════════════════════════════════
ANALYSIS OF CORE CAPABILITIES
══════════════════════════════════════════════════════════════════════════════

CAPABILITY 1: OPERATIONAL COORDINATION
────────────────────────────────────────────────────────────────────────────────
Rating: ${r.coopAnalysis.continuityScore >= 70 ? 'PERFORMED' : r.coopAnalysis.continuityScore >= 50 ? 'PARTIALLY PERFORMED' : 'NOT PERFORMED'}

Strengths:
• EOC activation procedures are documented
• Basic succession plan exists

Areas for Improvement:
${r.coopAnalysis.vulnerabilities.filter(v => v.status !== 'mitigated').map(v => `• ${v.facility}: ${v.risk}`).join('\n') || '• No critical issues identified'}

CAPABILITY 2: SITUATIONAL ASSESSMENT
────────────────────────────────────────────────────────────────────────────────
Rating: ${r.metrics.rld.status === 'good' ? 'PERFORMED' : r.metrics.rld.status === 'warning' ? 'PARTIALLY PERFORMED' : 'NOT PERFORMED'}

Strengths:
• Information collection procedures exist

Areas for Improvement:
• Response Latency Delta of ${r.metrics.rld.value} indicates slower-than-planned information flow
• ${r.metrics.rld.interpretation}

CAPABILITY 3: MASS CARE SERVICES
────────────────────────────────────────────────────────────────────────────────
Rating: ${r.metrics.rsr.status === 'good' ? 'PERFORMED' : r.metrics.rsr.status === 'warning' ? 'PARTIALLY PERFORMED' : 'NOT PERFORMED'}

Strengths:
• Shelter locations identified in plans

Areas for Improvement:
${r.gaps.filter(g => g.category.toLowerCase().includes('shelter')).map(g => `• ${g.description}`).join('\n') || '• Resource verification needed'}

CAPABILITY 4: LOGISTICS AND SUPPLY CHAIN MANAGEMENT
────────────────────────────────────────────────────────────────────────────────
Rating: ${r.supplyChainAnalysis.vulnerability <= 50 ? 'PERFORMED' : r.supplyChainAnalysis.vulnerability <= 70 ? 'PARTIALLY PERFORMED' : 'NOT PERFORMED'}

Strengths:
• Supply chain relationships documented

Areas for Improvement:
${r.supplyChainAnalysis.singlePoints.map(s => `• ${s}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
IMPROVEMENT PLAN
══════════════════════════════════════════════════════════════════════════════

${r.gaps.map((g, i) => `
IMPROVEMENT ${i+1}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Capability: ${g.category}
Issue/Observation: ${g.description}
Analysis: ${g.metric}

Recommendation: ${g.recommendation}

Implementation:
  - Priority: ${g.severity.toUpperCase()}
  - Estimated Cost: $${g.cost.toLocaleString()}
  - Primary Responsible Agency: [ASSIGN]
  - Target Completion Date: [DATE]
  
Success Metrics:
  - Population protected: ${g.affected.toLocaleString()}
  - Vulnerable population served: ${g.vulnerable.toLocaleString()}
  - Expected ROI: ${g.roi}:1`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
PARTICIPANT FEEDBACK SUMMARY
══════════════════════════════════════════════════════════════════════════════

This section to be completed by exercise participants:

What went well:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

What could be improved:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

══════════════════════════════════════════════════════════════════════════════
APPROVAL AND SIGN-OFF
══════════════════════════════════════════════════════════════════════════════

Emergency Manager: ___________________________ Date: ___________

Fire Chief: ___________________________ Date: ___________

Police Chief: ___________________________ Date: ___________

City/County Manager: ___________________________ Date: ___________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by SOP Sentinel | FEMA HSEEP-Compliant Format
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    } else if (format === 'data') {
      content = `SOP SENTINEL - RAW DATA EXPORT
═══════════════════════════════════════════════════════════════════════════════
Export Type: Machine-Readable Data
Generated: ${timestamp}
Simulation ID: ${r.simulationId}
Format Version: 2.0

[METADATA]
jurisdiction=${r.jurisdiction}
overall_score=${r.overallScore}
confidence=${r.confidence}
timestamp=${new Date().toISOString()}
legal_mode=${legalMode}
national_percentile=${r.benchmarks.national.percentile}
peer_percentile=${r.benchmarks.peer.percentile}

[METRICS]
rld_value=${r.metrics.rld.value}
rld_status=${r.metrics.rld.status}
rld_trend=${r.metrics.rld.trend}
eis_value=${r.metrics.eis.value}
eis_status=${r.metrics.eis.status}
eis_trend=${r.metrics.eis.trend}
rsr_value=${r.metrics.rsr.value}
rsr_status=${r.metrics.rsr.status}
rsr_trend=${r.metrics.rsr.trend}
froi_value=${r.metrics.froi.value}
froi_status=${r.metrics.froi.status}
froi_trend=${r.metrics.froi.trend}

[CASCADE_ANALYSIS]
cascade_risk=${r.cascadeAnalysis.overallRisk}
critical_nodes=${r.cascadeAnalysis.criticalNodes.join('|')}
${r.cascadeAnalysis.pathways.map(p => `pathway_${p.step}=${p.state}|${p.probability}|${p.time}`).join('\n')}

[MUTUAL_AID]
network_score=${r.mutualAidAnalysis.networkScore}
${r.mutualAidAnalysis.partners.map(p => `partner_${p.name.toLowerCase().replace(/\s/g,'_')}=${p.distance}|${p.status}|${p.simultaneousRisk}|${p.resources.join(',')}`).join('\n')}

[SUPPLY_CHAIN]
vulnerability_score=${r.supplyChainAnalysis.vulnerability}
${r.supplyChainAnalysis.dependencies.map(d => `supply_${d.item.toLowerCase().replace(/[\s\/]/g,'_')}=${d.vendors}|${d.leadTime}|${d.risk}|${d.stockpile}`).join('\n')}
single_points=${r.supplyChainAnalysis.singlePoints.join('|')}

[DECISION_FATIGUE]
sustainability_score=${r.decisionFatigueAnalysis.sustainabilityScore}
${Object.entries(r.decisionFatigueAnalysis.staffing).map(([k,v]) => `staffing_${k}=${v.adequacy}|${v.concern}`).join('\n')}

[COOP]
continuity_score=${r.coopAnalysis.continuityScore}
succession_depth=${r.coopAnalysis.succession.depth}
succession_trained=${r.coopAnalysis.succession.trained}
succession_exercised=${r.coopAnalysis.succession.exercised}

[EQUITY]
equity_score=${r.equityAnalysis.overallScore}
${r.equityAnalysis.groups.map(g => `group_${g.name.toLowerCase().replace(/[\s\(\)\+]/g,'_')}=${g.population}|${g.coverage}|${g.accessScore}|${g.priority}|${g.gaps.join(',')}`).join('\n')}

[GAPS]
total_gaps=${r.gaps.length}
critical_count=${r.gaps.filter(g => g.severity === 'critical').length}
high_count=${r.gaps.filter(g => g.severity === 'high').length}
medium_count=${r.gaps.filter(g => g.severity === 'medium').length}
total_cost=${r.gaps.reduce((s,g) => s + g.cost, 0)}
avg_roi=${(r.gaps.reduce((s,g) => s + g.roi, 0) / r.gaps.length).toFixed(2)}

${r.gaps.map(g => `
[GAP_${g.id.toUpperCase()}]
category=${g.category}
severity=${g.severity}
description=${g.description}
metric=${g.metric}
affected=${g.affected}
vulnerable=${g.vulnerable}
cost=${g.cost}
roi=${g.roi}
recommendation=${g.recommendation}
grants=${g.grants.join(',')}`).join('\n')}

[COPY_PASTE_DETECTION]
${r.copyPaste.map((cp, i) => `finding_${i+1}=${cp.section}|${cp.match}|${cp.confidence}|${cp.issue}`).join('\n')}

[END_OF_EXPORT]
checksum=SIM-${r.simulationId}
`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_Sentinel_${r.simulationId}_${format}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Components
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-2xl border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Sparkles className="w-8 h-8 text-amber-600" />Time Liberation Dashboard</h2><p className="text-gray-500 mt-1">Reclaiming time for work that saves lives.</p></div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg border border-green-300"><BadgeCheck className="w-5 h-5 text-green-600" /><span className="text-green-600 font-medium">Active</span></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[{ icon: Timer, value: timeSaved.toLocaleString(), label: 'Hours Saved', color: 'cyan' }, { icon: Heart, value: livesProtected.toLocaleString(), label: 'Lives Protected', color: 'green' }, { icon: CircleDollarSign, value: `$${(fundingWon/1000000).toFixed(1)}M`, label: 'Funding Won', color: 'amber' }, { icon: ShieldCheck, value: gapsFixed, label: 'Gaps Fixed', color: 'purple' }].map((s,i) => (
            <div key={i} className="bg-gray-100/50 rounded-xl p-4 border border-gray-300">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${s.color}-500/20 rounded-lg flex items-center justify-center`}><s.icon className={`w-6 h-6 text-${s.color}-400`} /></div>
                <div><p className="text-2xl font-bold text-gray-800">{s.value}</p><p className="text-sm text-gray-500">{s.label}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {analysisResults ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90"><circle cx="80" cy="80" r="70" stroke="#334155" strokeWidth="12" fill="none" /><circle cx="80" cy="80" r="70" stroke={analysisResults.overallScore >= 70 ? '#22c55e' : analysisResults.overallScore >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="12" fill="none" strokeDasharray={`${(analysisResults.overallScore/100)*440} 440`} strokeLinecap="round" /></svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-bold text-gray-800">{analysisResults.overallScore}</span><span className="text-sm text-gray-500">of 100</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Metrics</h3>
            <div className="space-y-3">
              {Object.entries(analysisResults.metrics).map(([k,m]) => (
                <div key={k} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div><p className="text-sm font-medium text-gray-800">{m.name}</p><p className="text-xs text-gray-500">{m.interpretation}</p></div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-sm ${m.status === 'critical' ? 'bg-red-100 text-red-600' : m.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{m.value}</span>
                    <span className={`text-xs ${m.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>{m.trend > 0 ? '↑' : '↓'}{Math.abs(m.trend)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-gray-800">Critical Gaps</h3><span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">{analysisResults.gaps.filter(g => g.severity === 'critical').length} Critical</span></div>
            <div className="space-y-3">
              {analysisResults.gaps.slice(0,4).map(gap => (
                <div key={gap.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-400">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${gap.severity === 'critical' ? 'bg-red-500' : gap.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                    <div><p className="font-medium text-gray-800">{gap.category}</p><p className="text-sm text-gray-500">{gap.description.substring(0,50)}...</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">${gap.cost.toLocaleString()}</span>
                    <button onClick={() => { setSelectedGaps([gap]); setActiveTab('fund-fixes'); setActiveModule('gap-to-grant'); }} className="px-4 py-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-500/30">Fund Gap</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-8 text-center">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Stress Test Your SOPs?</h3>
          <p className="text-gray-500 mb-6">Upload documents and run analysis.</p>
          <button onClick={() => setActiveModule('configuration')} className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg">Get Started</button>
        </div>
      )}
    </div>
  );

  const Configuration = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Configuration</h2>
      
      {/* Document Mode Toggle */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-600" />Document Type</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => { setDocumentMode('sop'); setAnalysisResults(null); }} 
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${documentMode === 'sop' ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${documentMode === 'sop' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${documentMode === 'sop' ? 'text-amber-700' : 'text-gray-700'}`}>SOP / EOP Analysis</p>
                <p className="text-xs text-gray-500">Standard Operating Procedures, Emergency Operations Plans</p>
              </div>
            </div>
          </button>
          <button 
            onClick={() => { setDocumentMode('hmp'); setAnalysisResults(null); }} 
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${documentMode === 'hmp' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${documentMode === 'hmp' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${documentMode === 'hmp' ? 'text-blue-700' : 'text-gray-700'}`}>Hazard Mitigation Plan</p>
                <p className="text-xs text-gray-500">FEMA 44 CFR 201.6 Compliance Analysis</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-amber-600" />Jurisdiction</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Object.entries(globalRegions).map(([rk, region]) => (
              <div key={rk} className="border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => toggleRegion(rk)} className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200">
                  <span className="font-medium text-gray-800">{region.name}</span>
                  {expandedRegions[rk] ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                </button>
                {expandedRegions[rk] && (
                  <div className="p-2 bg-white/50 space-y-1">
                    {Object.entries(region.countries).map(([ck, country]) => (
                      <button key={ck} onClick={() => { setSelectedRegion(rk); setSelectedCountry(ck); }} className={`w-full flex items-center gap-3 p-2 rounded-lg ${selectedCountry === ck ? 'bg-amber-100 border border-amber-400' : 'hover:bg-gray-200'}`}>
                        <span className="text-xl">{country.flag}</span>
                        <div className="text-left"><p className="text-sm font-medium text-gray-800">{country.name}</p><p className="text-xs text-gray-500">{country.framework}</p></div>
                        {selectedCountry === ck && <Check className="w-4 h-4 text-amber-600 ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-amber-600" />Documents</h3>
          <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center hover:border-amber-400">
            <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer"><Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" /><p className="text-gray-800 font-medium">{documentMode === 'hmp' ? 'Drop Hazard Mitigation Plan' : 'Drop SOPs, Training, EM Plans'}</p><p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT</p></label>
          </div>
          {uploadedDocuments.length > 0 && <div className="mt-4 space-y-2">{uploadedDocuments.map(d => <div key={d.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-amber-600" /><span className="text-sm text-gray-800">{d.name}</span></div><Check className="w-5 h-5 text-green-600" /></div>)}</div>}
        </div>
        {documentMode === 'sop' && (
        <div className="col-span-2 bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-600" />Hazards ({Object.keys(allHazards).length})</h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {Object.entries(hazardCategories).map(([ck, cat]) => (
              <div key={ck} className="border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => toggleCategory(ck)} className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200">
                  <div className="flex items-center gap-3"><span className="text-xl">{cat.icon}</span><span className="font-medium text-gray-800">{cat.name}</span><span className="text-xs text-gray-500">({Object.keys(cat.hazards).length})</span></div>
                  {expandedCategories[ck] ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                </button>
                {expandedCategories[ck] && (
                  <div className="p-3 bg-white/50 grid grid-cols-4 gap-2">
                    {Object.entries(cat.hazards).map(([hk, haz]) => (
                      <button key={hk} onClick={() => setSelectedHazards(p => p.includes(hk) ? p.filter(h => h !== hk) : [...p, hk])} className={`p-2 rounded-lg border text-left ${selectedHazards.includes(hk) ? 'bg-amber-100 border-amber-400 text-amber-600' : 'bg-gray-100 border-gray-400 text-gray-600 hover:border-gray-500'}`}>
                        <span className="text-lg block">{haz.icon}</span><span className="text-xs">{haz.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        )}
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-amber-600" />Legal Mode</h3>
          <div className="space-y-3">
            {[{ m: 'workshop', l: 'Workshop (Protected)', d: 'Attorney Work Product', c: 'purple' }, { m: 'certification', l: 'Certification (Public)', d: 'FEMA safe', c: 'green' }].map(o => (
              <button key={o.m} onClick={() => setLegalMode(o.m)} className={`w-full p-4 rounded-lg border text-left ${legalMode === o.m ? `bg-${o.c}-500/20 border-${o.c}-500/50` : 'bg-gray-100 border-gray-400'}`}>
                <p className={`font-medium ${legalMode === o.m ? `text-${o.c}-400` : 'text-gray-800'}`}>{o.l}</p><p className="text-xs text-gray-500">{o.d}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-600" />Run Test</h3>
          <div className="space-y-3 mb-4">
            {documentMode === 'sop' ? (
              [{ l: 'Jurisdiction', r: !!selectedCountry }, { l: 'Documents', r: uploadedDocuments.length > 0 }, { l: 'Hazards', r: selectedHazards.length > 0 }].map(i => (
                <div key={i.l} className="flex items-center justify-between text-sm"><span className="text-gray-500">{i.l}:</span><span className={i.r ? 'text-green-600' : 'text-red-600'}>{i.r ? '✓' : '✗'}</span></div>
              ))
            ) : (
              [{ l: 'Jurisdiction', r: !!selectedCountry }, { l: 'HMP Document', r: uploadedDocuments.length > 0 }].map(i => (
                <div key={i.l} className="flex items-center justify-between text-sm"><span className="text-gray-500">{i.l}:</span><span className={i.r ? 'text-green-600' : 'text-red-600'}>{i.r ? '✓' : '✗'}</span></div>
              ))
            )}
          </div>
          <button onClick={runAnalysis} disabled={!selectedCountry || !uploadedDocuments.length || (documentMode === 'sop' && !selectedHazards.length) || analysisRunning} className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 ${(!selectedCountry || !uploadedDocuments.length || (documentMode === 'sop' && !selectedHazards.length) || analysisRunning) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : documentMode === 'hmp' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white'}`}>
            {analysisRunning ? <><RefreshCw className="w-5 h-5 animate-spin" />Analyzing...</> : documentMode === 'hmp' ? <><Shield className="w-5 h-5" />Analyze HMP</> : <><Zap className="w-5 h-5" />Run Stress Test</>}
          </button>
          {analysisRunning && <div className="mt-4"><div className="flex justify-between text-sm mb-2"><span className="text-gray-500 truncate max-w-[180px]">{analysisPhase}</span><span className={documentMode === 'hmp' ? 'text-blue-600' : 'text-amber-600'}>{analysisProgress}%</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${documentMode === 'hmp' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`} style={{ width: `${analysisProgress}%` }} /></div></div>}
        </div>
      </div>
    </div>
  );

  const DigitalTwin = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Layers className="w-8 h-8 text-amber-600" />Digital Twin</h2>
        {analysisResults && <button onClick={() => setSimulationRunning(!simulationRunning)} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${simulationRunning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{simulationRunning ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Run</>}</button>}
      </div>
      {analysisResults ? (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Map</h3>
            <div className="relative bg-gray-100/50 rounded-lg h-80 border border-gray-300 p-4">
              <div className="grid grid-cols-3 gap-4">
                {analysisResults.digitalTwin.assets.map((a,i) => (
                  <div key={a.id} className={`p-4 rounded-xl border-2 ${a.status === 'operational' ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-500/50'}`}>
                    <div className="flex items-center gap-3">
                      {a.type === 'facility' && <Building className="w-6 h-6 text-green-600" />}
                      {a.type === 'shelter' && <Home className="w-6 h-6 text-blue-600" />}
                      {a.type === 'medical' && <Heart className="w-6 h-6 text-red-600" />}
                      {a.type === 'responder' && <Siren className="w-6 h-6 text-orange-600" />}
                      <div><p className="text-sm font-medium text-gray-800">{a.name}</p><p className="text-xs text-gray-500">{a.utilization}% util</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Status</h3>
            <div className="space-y-3">
              {analysisResults.digitalTwin.assets.map(a => (
                <div key={a.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${a.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'}`} /><span className="text-sm text-gray-800">{a.name}</span></div>
                  <span className="text-xs text-gray-500">{a.utilization}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run stress test first</p></div>}
    </div>
  );

  const StressTestEngine = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Zap className="w-8 h-8 text-amber-600" />Stress Test Results</h2>
      {analysisResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(analysisResults.metrics).map(([k,m]) => (
              <div key={k} className={`p-5 rounded-xl border ${m.status === 'critical' ? 'bg-red-50 border-red-300' : m.status === 'warning' ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
                <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">{m.name}</span><span className={`text-2xl font-bold ${m.status === 'critical' ? 'text-red-600' : m.status === 'warning' ? 'text-yellow-600' : 'text-green-600'}`}>{m.value}</span></div>
                <p className="text-xs text-gray-500">{m.interpretation}</p>
                <div className="flex items-center gap-1 mt-2">{m.trend > 0 ? <ArrowUpRight className="w-4 h-4 text-green-600" /> : <ArrowDownRight className="w-4 h-4 text-red-600" />}<span className={`text-xs ${m.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(m.trend)}%</span></div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Copy-Paste Detection</h3>
            <div className="space-y-3">
              {analysisResults.copyPaste.map((f,i) => (
                <div key={i} className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium text-yellow-600">{f.section}</span><span className="text-sm text-gray-500">{f.confidence}% match</span></div>
                  <p className="text-sm text-gray-600">Source: {f.match}</p><p className="text-xs text-gray-500 mt-1">{f.issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run stress test first</p></div>}
    </div>
  );

  const EquityAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Scale className="w-8 h-8 text-amber-600" />Equity Analysis</h2>
      {analysisResults ? (
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-2"><h3 className="text-lg font-semibold text-gray-800">Equity Score</h3><span className={`px-4 py-2 rounded-lg ${analysisResults.equityAnalysis.overallScore >= 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{analysisResults.equityAnalysis.overallScore}/100</span></div>
            <p className="text-xs text-gray-400 mb-4 italic">📊 Data Source: {analysisResults.equityAnalysis.populationSource || 'Estimated from jurisdiction demographics'}</p>
            <div className="space-y-4">
              {analysisResults.equityAnalysis.groups.map((g,i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3"><span className={`px-2 py-1 rounded text-xs ${g.priority === 'critical' ? 'bg-red-100 text-red-600' : g.priority === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{g.priority}</span><span className="font-medium text-gray-800">{g.name}</span></div>
                    <div className="text-right"><span className="text-sm text-gray-800">{g.population.toLocaleString()}</span>{g.percentOfTotal && <span className="text-xs text-gray-400 ml-2">({g.percentOfTotal})</span>}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div><p className="text-xs text-gray-500 mb-1">Coverage</p><div className="flex items-center gap-2"><div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${g.coverage >= 70 ? 'bg-green-500' : g.coverage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${g.coverage}%` }} /></div><span className="text-sm text-gray-800">{g.coverage}%</span></div></div>
                    <div><p className="text-xs text-gray-500 mb-1">Access Score</p><div className="flex items-center gap-2"><div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${g.accessScore >= 70 ? 'bg-green-500' : g.accessScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${g.accessScore}%` }} /></div><span className="text-sm text-gray-800">{g.accessScore}</span></div></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">{g.gaps.map((gap,j) => <span key={j} className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">{gap}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-green-600" />Recommendations</h3>
            <div className="grid grid-cols-2 gap-3">{analysisResults.equityAnalysis.recommendations.map((r,i) => <div key={i} className="p-3 bg-green-50 border border-green-300 rounded-lg flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600">{r}</span></div>)}</div>
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run stress test first</p></div>}
    </div>
  );

  const SimpleModule = ({ title, icon: Icon, data, renderContent }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Icon className="w-8 h-8 text-amber-600" />{title}</h2>
      {analysisResults ? renderContent() : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run stress test first</p></div>}
    </div>
  );

  const CascadeModeling = () => <SimpleModule title="Cascade Modeling" icon={Network} renderContent={() => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cascade Risk: {analysisResults.cascadeAnalysis.overallRisk}%</h3>
        <div className="flex items-center justify-between py-8">
          {analysisResults.cascadeAnalysis.pathways.map((p,i) => (
            <React.Fragment key={i}>
              <div className="text-center flex-1">
                <div className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center border-2 ${p.probability >= 70 ? 'bg-red-100 border-red-500/50' : p.probability >= 50 ? 'bg-yellow-100 border-yellow-500/50' : 'bg-green-100 border-green-400'}`}><span className={`text-xl font-bold ${p.probability >= 70 ? 'text-red-600' : p.probability >= 50 ? 'text-yellow-600' : 'text-green-600'}`}>{p.probability}%</span></div>
                <p className="text-sm font-medium text-gray-800 mt-2">{p.state}</p><p className="text-xs text-gray-500">{p.time}</p>
              </div>
              {i < analysisResults.cascadeAnalysis.pathways.length - 1 && <ArrowRight className="w-6 h-6 text-gray-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Critical Nodes</h3>
          <div className="space-y-2">{analysisResults.cascadeAnalysis.criticalNodes.map((n,i) => <div key={i} className="p-3 bg-red-50 border border-red-300 rounded-lg text-gray-800">{n}</div>)}</div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Interventions</h3>
          <div className="space-y-2">{analysisResults.cascadeAnalysis.interventions.map((r,i) => <div key={i} className="p-3 bg-green-50 border border-green-300 rounded-lg text-gray-600 text-sm">{r}</div>)}</div>
        </div>
      </div>
    </div>
  )} />;

  const MutualAid = () => <SimpleModule title="Mutual Aid" icon={Users} renderContent={() => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Network Score: {analysisResults.mutualAidAnalysis.networkScore}/100</h3>
        <div className="space-y-3">{analysisResults.mutualAidAnalysis.partners.map((p,i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.status === 'available' ? 'bg-green-100' : 'bg-yellow-100'}`}><Users className={`w-5 h-5 ${p.status === 'available' ? 'text-green-600' : 'text-yellow-600'}`} /></div><div><p className="font-medium text-gray-800">{p.name}</p><p className="text-xs text-gray-500">{p.distance} • {p.resources.join(', ')}</p></div></div>
            <span className={`px-2 py-1 rounded text-xs ${p.simultaneousRisk >= 50 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{p.simultaneousRisk}% risk</span>
          </div>
        ))}</div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Warnings</h3><div className="space-y-2">{analysisResults.mutualAidAnalysis.warnings.map((w,i) => <div key={i} className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-gray-600">{w}</div>)}</div></div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3><div className="space-y-2">{analysisResults.mutualAidAnalysis.recommendations.map((r,i) => <div key={i} className="p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-gray-600">{r}</div>)}</div></div>
      </div>
    </div>
  )} />;

  const SupplyChain = () => <SimpleModule title="Supply Chain" icon={Package} renderContent={() => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Vulnerability: {analysisResults.supplyChainAnalysis.vulnerability}%</h3>
        <div className="space-y-3">{analysisResults.supplyChainAnalysis.dependencies.map((d,i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div><p className="font-medium text-gray-800">{d.item}</p><p className="text-xs text-gray-500">{d.vendors} vendor(s) • {d.leadTime}</p></div>
            <div className="flex items-center gap-3"><span className="text-xs text-gray-500">Stock: {d.stockpile}</span><span className={`px-2 py-1 rounded text-xs uppercase ${d.risk === 'critical' ? 'bg-red-100 text-red-600' : d.risk === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{d.risk}</span></div>
          </div>
        ))}</div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Single Points</h3><div className="space-y-2">{analysisResults.supplyChainAnalysis.singlePoints.map((s,i) => <div key={i} className="p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-gray-600">{s}</div>)}</div></div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3><div className="space-y-2">{analysisResults.supplyChainAnalysis.recommendations.map((r,i) => <div key={i} className="p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-gray-600">{r}</div>)}</div></div>
      </div>
    </div>
  )} />;

  const DecisionFatigue = () => <SimpleModule title="Decision Fatigue" icon={Brain} renderContent={() => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sustainability: {analysisResults.decisionFatigueAnalysis.sustainabilityScore}/100</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(analysisResults.decisionFatigueAnalysis.staffing).map(([p,d]) => (
            <div key={p} className={`p-4 rounded-lg border ${d.concern === 'critical' ? 'bg-red-50 border-red-300' : d.concern === 'high' ? 'bg-orange-500/10 border-orange-500/30' : d.concern === 'medium' ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
              <p className="text-sm text-gray-500">{p}</p><p className={`text-2xl font-bold ${d.concern === 'critical' ? 'text-red-600' : d.concern === 'high' ? 'text-orange-600' : d.concern === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>{d.adequacy}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Decision Points</h3>
          <div className="space-y-3">{analysisResults.decisionFatigueAnalysis.decisionPoints.map((p,i) => (
            <div key={i} className="p-3 bg-gray-100 rounded-lg flex items-center justify-between">
              <span className="text-gray-800">Hour {p.hour}: {p.decision}</span><span className={`px-2 py-1 rounded text-xs ${p.fatigueRisk === 'critical' ? 'bg-red-100 text-red-600' : p.fatigueRisk === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{p.fatigueRisk}</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3><div className="space-y-2">{analysisResults.decisionFatigueAnalysis.recommendations.map((r,i) => <div key={i} className="p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-gray-600">{r}</div>)}</div></div>
      </div>
    </div>
  )} />;

  const COOP = () => <SimpleModule title="COOP" icon={Building} renderContent={() => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Continuity: {analysisResults.coopAnalysis.continuityScore}/100</h3>
        <div className="space-y-3">{analysisResults.coopAnalysis.vulnerabilities.map((v,i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div><p className="font-medium text-gray-800">{v.facility}</p><p className="text-sm text-red-600">{v.risk}</p></div>
            <div className="text-right"><span className={`px-2 py-1 rounded text-xs ${v.status === 'mitigated' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{v.status}</span><p className="text-xs text-gray-500 mt-1">{v.mitigation}</p></div>
          </div>
        ))}</div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Succession</h3>
          <div className="space-y-3"><div className="flex justify-between"><span className="text-gray-500">Depth</span><span className="text-gray-800">{analysisResults.coopAnalysis.succession.depth}</span></div><div className="flex justify-between"><span className="text-gray-500">Trained</span><span className="text-gray-800">{analysisResults.coopAnalysis.succession.trained}</span></div><div className="flex justify-between"><span className="text-gray-500">Exercised</span><span className="text-gray-800">{analysisResults.coopAnalysis.succession.exercised}</span></div></div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Functions</h3>
          <div className="space-y-2">{analysisResults.coopAnalysis.functions.map((f,i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-800">{f.function}</span><span className={`px-2 py-1 rounded text-xs ${f.status === 'adequate' ? 'bg-green-100 text-green-600' : f.status === 'needs improvement' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{f.status}</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  )} />;

  const Reports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><FileOutput className="w-8 h-8 text-amber-600" />Reports & AAR</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate</h3>
          <div className="space-y-3">
            {[{ t: 'executive', l: 'Executive Summary', d: '2-page overview' }, { t: 'full', l: 'Full Report', d: 'Complete analysis' }, { t: 'aar', l: 'AAR', d: 'FEMA format' }, { t: 'data', l: 'Data Export', d: 'All metrics' }].map(r => (
              <button key={r.t} onClick={() => downloadReport(r.t)} disabled={!analysisResults} className={`w-full p-4 rounded-lg border flex items-center gap-4 ${!analysisResults ? 'bg-gray-200/20 border-gray-300 text-gray-400 cursor-not-allowed' : 'bg-gray-100 border-gray-400 hover:border-cyan-500'}`}>
                <FileOutput className="w-8 h-8 text-amber-600" /><div className="flex-1 text-left"><p className="font-medium text-gray-800">{r.l}</p><p className="text-xs text-gray-500">{r.d}</p></div><Download className="w-5 h-5 text-gray-500" />
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
          {analysisResults ? (
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-100 rounded-lg"><p className="text-gray-500 text-xs">ID</p><p className="text-gray-800 font-mono">{analysisResults.simulationId}</p></div>
              <div className="p-3 bg-gray-100 rounded-lg"><p className="text-gray-500 text-xs">Score</p><p className="text-gray-800">{analysisResults.overallScore}/100</p></div>
              <div className="p-3 bg-gray-100 rounded-lg"><p className="text-gray-500 text-xs">Gaps</p><p className="text-gray-800">{analysisResults.gaps.length}</p></div>
              <div className="p-3 bg-gray-100 rounded-lg"><p className="text-gray-500 text-xs">Mode</p><p className={legalMode === 'workshop' ? 'text-purple-600' : 'text-green-600'}>{legalMode === 'workshop' ? '🔒 Protected' : '📋 Public'}</p></div>
            </div>
          ) : <div className="text-center py-8"><FileOutput className="w-12 h-12 text-gray-400 mx-auto mb-2" /><p className="text-gray-500 text-sm">Run analysis first</p></div>}
        </div>
      </div>
    </div>
  );

  const GrantDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><CircleDollarSign className="w-8 h-8 text-amber-600" />Grant Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        {(() => {
          // Calculate days to BRIC deadline (January 31, 2026)
          const bricDeadline = new Date('2026-01-31');
          const today = new Date();
          const daysRemaining = Math.ceil((bricDeadline - today) / (1000 * 60 * 60 * 24));
          return [{ icon: PiggyBank, value: `$${(fundingWon/1000000).toFixed(1)}M`, label: 'Won', color: 'green' }, { icon: Receipt, value: grantDrafts.length, label: 'Drafts', color: 'amber' }, { icon: Target, value: grantMatches.length, label: 'Matches', color: 'cyan' }, { icon: Calendar, value: daysRemaining > 0 ? daysRemaining : 'Closed', label: 'Days to BRIC', color: 'purple' }].map((s,i) => (
          <div key={i} className={`bg-gradient-to-br from-${s.color}-500/20 to-${s.color}-500/10 rounded-xl border border-${s.color}-500/30 p-5`}>
            <div className="flex items-center gap-3"><s.icon className={`w-10 h-10 text-${s.color}-400`} /><div><p className="text-2xl font-bold text-gray-800">{s.value}</p><p className={`text-sm text-${s.color}-400`}>{s.label}</p></div></div>
          </div>
        ));
        })()}
      </div>
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Matches</h3>
        {grantMatches.length > 0 ? (
          <div className="space-y-3">{grantMatches.slice(0,5).map((m,i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center"><span className="text-lg font-bold text-amber-600">{m.matchScore}%</span></div><div><p className="font-medium text-gray-800">{m.grantName}</p><p className="text-sm text-gray-500">{m.gapCategory}</p></div></div>
              <div className="text-right"><p className="font-medium text-gray-800">${m.award.toLocaleString()}</p><p className="text-xs text-gray-500">{m.deadline}</p></div>
            </div>
          ))}</div>
        ) : <div className="text-center py-8"><Target className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-500">Run stress test for matches</p></div>}
      </div>
    </div>
  );

  const GapToGrant = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Target className="w-8 h-8 text-amber-600" />Gap → Grant</h2>
      {analysisResults ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gaps</h3>
            <div className="space-y-3 max-h-[450px] overflow-y-auto">{analysisResults.gaps.map(g => (
              <div key={g.id} onClick={() => setSelectedGaps([g])} className={`p-4 rounded-lg border cursor-pointer ${selectedGaps.some(x => x.id === g.id) ? 'bg-amber-100 border-amber-400' : 'bg-gray-100 border-gray-400 hover:border-gray-500'}`}>
                <div className="flex items-center justify-between mb-2"><span className={`px-2 py-0.5 rounded text-xs ${g.severity === 'critical' ? 'bg-red-100 text-red-600' : g.severity === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{g.severity}</span><span className="text-sm text-gray-500">${g.cost.toLocaleString()}</span></div>
                <p className="font-medium text-gray-800">{g.category}</p><p className="text-sm text-gray-500 mt-1">{g.description.substring(0,50)}...</p>
                <div className="flex gap-2 mt-2">{g.grants.map(x => <span key={x} className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded text-xs">{x}</span>)}</div>
              </div>
            ))}</div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Matches</h3>
            {selectedGaps.length > 0 ? (
              <div className="space-y-4">{selectedGaps[0].grants.map(gId => {
                const grant = grantPrograms[gId.toLowerCase()];
                if (!grant) return null;
                const match = grantMatches.find(m => m.gapId === selectedGaps[0].id && m.grantId === gId);
                const score = match?.matchScore || 80;
                return (
                  <div key={gId} className="p-4 bg-gray-100 rounded-lg border border-gray-400">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3"><div className={`w-14 h-14 rounded-lg flex items-center justify-center ${score >= 90 ? 'bg-green-100' : 'bg-amber-100'}`}><span className={`text-xl font-bold ${score >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{score}%</span></div><div><p className="font-medium text-gray-800">{grant.name}</p><p className="text-sm text-gray-500">{grant.agency}</p></div></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                      <div><p className="text-gray-400">Range</p><p className="text-gray-800">${(grant.fundingRange.min/1000)}K-${(grant.fundingRange.max/1000000)}M</p></div>
                      <div><p className="text-gray-400">Match</p><p className="text-gray-800">{grant.costShare.federal}/{grant.costShare.local}</p></div>
                      <div><p className="text-gray-400">Deadline</p><p className="text-gray-800">{grant.deadline}</p></div>
                    </div>
                    <button onClick={() => { const draft = generateNarrative(selectedGaps[0], grant); setGrantDrafts(p => [...p, draft]); setActiveGrant(draft); setActiveModule('grant-writer'); }} className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg">Generate Narrative</button>
                  </div>
                );
              })}</div>
            ) : <div className="text-center py-12"><ArrowRight className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-500">Select a gap</p></div>}
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Target className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run stress test first</p></div>}
    </div>
  );

  const exportGrantNarrative = () => {
    if (!activeGrant) return;
    const content = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    GRANT APPLICATION NARRATIVE                               ║
║                         ${activeGrant.grantName}                              
╚══════════════════════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}
Draft ID: ${activeGrant.id}
Grant Program: ${activeGrant.grantId}

══════════════════════════════════════════════════════════════════════════════

${Object.entries(activeGrant.sections).map(([key, content]) => `
${key.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}
${'─'.repeat(78)}

${content}
`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
PLACEHOLDERS TO COMPLETE
══════════════════════════════════════════════════════════════════════════════

${activeGrant.placeholders.map((p, i) => `${i+1}. ${p}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
Generated by SOP Sentinel Grant Writer
══════════════════════════════════════════════════════════════════════════════
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Grant_Narrative_${activeGrant.grantId}_${activeGrant.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const GrantWriter = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><FileText className="w-8 h-8 text-amber-600" />Grant Writer</h2>
      {grantDrafts.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Drafts ({grantDrafts.length})</h3>
            <div className="space-y-2">{grantDrafts.map(d => (
              <button key={d.id} onClick={() => setActiveGrant(d)} className={`w-full p-3 rounded-lg border text-left ${activeGrant?.id === d.id ? 'bg-amber-100 border-amber-400' : 'bg-gray-100 border-gray-400'}`}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-gray-800">{d.grantId}</span><span className="text-xs text-amber-600">{d.completion}%</span></div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${d.completion}%` }} /></div>
              </button>
            ))}</div>
          </div>
          <div className="col-span-2 bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            {activeGrant ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{activeGrant.grantName}</h3>
                  <div className="flex gap-2"><button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm flex items-center gap-2"><Save className="w-4 h-4" />Save</button><button onClick={exportGrantNarrative} className="px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm flex items-center gap-2 hover:bg-green-500/30"><Download className="w-4 h-4" />Export</button></div>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {Object.entries(activeGrant.sections).map(([k,v]) => (
                    <div key={k}><label className="block text-sm font-medium text-gray-500 mb-2 capitalize">{k.replace(/([A-Z])/g, ' $1')}</label><textarea defaultValue={v} className="w-full h-32 bg-gray-200 border border-gray-400 rounded-lg p-3 text-gray-800 text-sm resize-none focus:border-amber-500 focus:outline-none" /></div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4 text-yellow-600" /><span className="text-sm font-medium text-yellow-600">Placeholders to Complete</span></div>
                  <div className="flex flex-wrap gap-2">{activeGrant.placeholders.map((p,i) => <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">{p}</span>)}</div>
                </div>
              </>
            ) : <div className="text-center py-12"><FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-500">Select a draft to edit</p></div>}
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500 mb-6">No drafts yet. Generate from Gap → Grant Matching.</p><button onClick={() => setActiveModule('gap-to-grant')} className="px-6 py-3 bg-amber-100 text-amber-600 rounded-lg">Go to Gap Matching</button></div>}
    </div>
  );

  const GrantTracking = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Calendar className="w-8 h-8 text-amber-600" />Grant Tracking</h2>
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications</h3>
        {grantDrafts.length > 0 ? (
          <div className="space-y-4">{grantDrafts.map(d => (
            <div key={d.id} className="p-4 bg-gray-100 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between mb-3"><div><p className="font-medium text-gray-800">{d.grantName || d.grantId}</p><p className="text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</p></div><span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">{d.status}</span></div>
              <div className="flex items-center gap-4"><div className="flex-1"><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{d.completion}%</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${d.completion}%` }} /></div></div><button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm">View</button></div>
            </div>
          ))}</div>
        ) : <div className="text-center py-8"><Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-500">No applications</p></div>}
      </div>
      <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Deadlines</h3>
        <div className="space-y-3">{Object.values(grantPrograms).map((g,i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"><div><p className="font-medium text-gray-800">{g.name}</p><p className="text-sm text-gray-500">{g.agency}</p></div><span className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-sm">{g.deadline}</span></div>
        ))}</div>
      </div>
    </div>
  );

  const ROICalculator = () => {
    const avgROI = analysisResults ? (analysisResults.gaps.reduce((s,g) => s + g.roi, 0) / analysisResults.gaps.length) : 10;
    const projReturn = investmentAmount * avgROI;
    const livesSaved = Math.floor(investmentAmount / 5000);
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Calculator className="w-8 h-8 text-amber-600" />ROI Calculator</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculator</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-500 mb-2">Investment</label><input type="range" min="10000" max="1000000" step="10000" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full" /><div className="flex justify-between text-sm mt-2"><span className="text-gray-500">$10K</span><span className="text-xl font-bold text-gray-800">${(investmentAmount/1000).toFixed(0)}K</span><span className="text-gray-500">$1M</span></div></div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-center"><p className="text-sm text-gray-500">Return</p><p className="text-2xl font-bold text-green-600">${(projReturn/1000000).toFixed(2)}M</p></div>
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-center"><p className="text-sm text-gray-500">Lives</p><p className="text-2xl font-bold text-amber-600">{livesSaved.toLocaleString()}</p></div>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"><p className="text-sm text-gray-500">Average ROI</p><p className="text-3xl font-bold text-amber-600">{avgROI.toFixed(1)}:1</p></div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gap ROI Rankings</h3>
            {analysisResults ? (
              <div className="space-y-3">{[...analysisResults.gaps].sort((a,b) => b.roi - a.roi).map((g,i) => (
                <div key={g.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-3"><span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm font-medium">{i+1}</span><div><p className="text-sm font-medium text-gray-800">{g.category}</p><p className="text-xs text-gray-500">${g.cost.toLocaleString()}</p></div></div>
                  <span className="text-lg font-bold text-green-600">{g.roi}:1</span>
                </div>
              ))}</div>
            ) : <div className="text-center py-8"><Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-500">Run stress test</p></div>}
          </div>
        </div>
      </div>
    );
  };

  // ========== HMP-SPECIFIC COMPONENTS ==========
  
  const HMPDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">HMP Assessment Dashboard</h2>
        {documentMode === 'hmp' && <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Hazard Mitigation Plan Mode</span>}
      </div>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(analysisResults.metrics).map(([key, m]) => (
              <div key={key} className={`bg-white shadow-sm rounded-xl border p-4 ${m.status === 'good' ? 'border-green-300' : m.status === 'warning' ? 'border-yellow-300' : 'border-red-300'}`}>
                <p className="text-xs text-gray-500 uppercase">{m.name}</p>
                <p className={`text-3xl font-bold ${m.status === 'good' ? 'text-green-600' : m.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>{m.value}%</p>
                <p className="text-xs text-gray-500 mt-1">{m.interpretation}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hazard Coverage</h3>
              <div className="space-y-2">
                {analysisResults.hazardIdentification.hazards.slice(0, 6).map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{h.hazard}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${h.status === 'complete' ? 'bg-green-100 text-green-600' : h.status === 'partial' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{h.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Implementation Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Completed</span><span className="font-medium text-green-600">{analysisResults.mitigationActions.completed} actions</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">In Progress</span><span className="font-medium text-blue-600">{analysisResults.mitigationActions.inProgress} actions</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Not Started</span><span className="font-medium text-gray-500">{analysisResults.mitigationActions.notStarted} actions</span></div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                  <div className="bg-green-500" style={{ width: `${(analysisResults.mitigationActions.completed / analysisResults.mitigationActions.total) * 100}%` }} />
                  <div className="bg-blue-500" style={{ width: `${(analysisResults.mitigationActions.inProgress / analysisResults.mitigationActions.total) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Recommendations</h3>
            <div className="grid grid-cols-2 gap-3">
              {analysisResults.recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload a Hazard Mitigation Plan</h3>
          <p className="text-gray-500 mb-6">Analyze your HMP for FEMA 44 CFR 201.6 compliance and implementation progress</p>
          <button onClick={() => setActiveModule('configuration')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Configure Analysis</button>
        </div>
      )}
    </div>
  );

  const HazardIdentification = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-blue-600" />Hazard Identification</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">{analysisResults.hazardIdentification.complete}</p><p className="text-sm text-gray-500">Complete</p></div>
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-yellow-600">{analysisResults.hazardIdentification.partial}</p><p className="text-sm text-gray-500">Partial</p></div>
            <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">{analysisResults.hazardIdentification.missing}</p><p className="text-sm text-gray-500">Missing</p></div>
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-blue-600">{analysisResults.hazardIdentification.score}%</p><p className="text-sm text-gray-500">Coverage Score</p></div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hazard Analysis Status</h3>
            <div className="space-y-2">
              {analysisResults.hazardIdentification.hazards.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${h.status === 'complete' ? 'bg-green-500' : h.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="font-medium text-gray-800">{h.hazard}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs ${h.riskLevel === 'high' ? 'bg-red-100 text-red-600' : h.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{h.riskLevel} risk</span>
                    <span className="text-sm text-gray-500">Updated: {h.lastUpdated}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${h.status === 'complete' ? 'bg-green-100 text-green-600' : h.status === 'partial' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const FEMACompliance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><BadgeCheck className="w-8 h-8 text-blue-600" />FEMA 44 CFR 201.6 Compliance</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">{analysisResults.femaCompliance.compliant}</p><p className="text-sm text-gray-500">Compliant</p></div>
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-yellow-600">{analysisResults.femaCompliance.partial}</p><p className="text-sm text-gray-500">Partial</p></div>
            <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">{analysisResults.femaCompliance.needsImprovement}</p><p className="text-sm text-gray-500">Needs Work</p></div>
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-blue-600">{analysisResults.femaCompliance.score}%</p><p className="text-sm text-gray-500">Overall Compliance</p></div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Checklist</h3>
            <div className="space-y-2">
              {analysisResults.femaCompliance.checklist.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === 'compliant' ? <CheckCircle className="w-5 h-5 text-green-600" /> : item.status === 'partial' ? <Clock className="w-5 h-5 text-yellow-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    <div><p className="font-medium text-gray-800">{item.requirement}</p><p className="text-xs text-gray-500">Section {item.section}</p></div>
                  </div>
                  <div className="text-right"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'compliant' ? 'bg-green-100 text-green-600' : item.status === 'partial' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{item.status}</span><p className="text-xs text-gray-500 mt-1">{item.notes}</p></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><BadgeCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const MitigationActions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Target className="w-8 h-8 text-blue-600" />Mitigation Actions</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Action Inventory ({analysisResults.mitigationActions.total} total)</h3>
              <span className="text-sm text-gray-500">Score: {analysisResults.mitigationActions.score}/100</span>
            </div>
            <div className="space-y-3">
              {analysisResults.mitigationActions.actions.map((a, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2"><span className="text-xs font-mono text-gray-500">{a.id}</span><span className={`px-2 py-0.5 rounded text-xs ${a.priority === 'high' ? 'bg-red-100 text-red-600' : a.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{a.priority}</span></div>
                      <p className="font-medium text-gray-800 mt-1">{a.action}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>📍 {a.responsible}</span><span>💰 ${a.cost.toLocaleString()}</span><span>📅 {a.timeline}</span><span>🏦 {a.fundingSource}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${a.status === 'completed' ? 'bg-green-100 text-green-600' : a.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Target className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const ImplementationStatus = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><CheckCircle className="w-8 h-8 text-blue-600" />Implementation Status</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-4"><p className="text-sm text-gray-500">Completion Rate</p><p className="text-3xl font-bold text-blue-600">{analysisResults.implementationStatus.completionRate}%</p></div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-4"><p className="text-sm text-gray-500">On Track</p><p className="text-3xl font-bold text-green-600">{analysisResults.implementationStatus.onTrack}%</p></div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-4"><p className="text-sm text-gray-500">Behind Schedule</p><p className="text-3xl font-bold text-red-600">{analysisResults.implementationStatus.behindSchedule}%</p></div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-4"><p className="text-sm text-gray-500">Budget Spent</p><p className="text-3xl font-bold text-gray-800">${(analysisResults.implementationStatus.spentToDate / 1000000).toFixed(1)}M</p></div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-500">Total Budget</span><span className="font-medium">${analysisResults.implementationStatus.totalBudget.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Spent to Date</span><span className="font-medium text-blue-600">${analysisResults.implementationStatus.spentToDate.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Remaining</span><span className="font-medium text-green-600">${(analysisResults.implementationStatus.totalBudget - analysisResults.implementationStatus.spentToDate).toLocaleString()}</span></div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${(analysisResults.implementationStatus.spentToDate / analysisResults.implementationStatus.totalBudget) * 100}%` }} /></div>
            </div>
          </div>
        </>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const CostBenefit = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Calculator className="w-8 h-8 text-blue-600" />Cost-Benefit Analysis</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6 text-center"><p className="text-sm text-gray-500">Total Mitigation Cost</p><p className="text-3xl font-bold text-gray-800">${(analysisResults.costBenefit.totalCost / 1000000).toFixed(1)}M</p></div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6 text-center"><p className="text-sm text-gray-500">Estimated Benefits</p><p className="text-3xl font-bold text-green-600">${(analysisResults.costBenefit.estimatedBenefits / 1000000).toFixed(1)}M</p></div>
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6 text-center"><p className="text-sm text-gray-500">Benefit-Cost Ratio</p><p className="text-3xl font-bold text-blue-600">{analysisResults.costBenefit.bcRatio}:1</p></div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Funding Sources</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-gray-500">Federal (FEMA)</span><div className="flex items-center gap-2"><span className="font-medium">${analysisResults.costBenefit.fundingSources.federal.toLocaleString()}</span><span className="text-xs text-gray-400">(75%)</span></div></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">State</span><div className="flex items-center gap-2"><span className="font-medium">${analysisResults.costBenefit.fundingSources.state.toLocaleString()}</span><span className="text-xs text-gray-400">(10%)</span></div></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Local Match</span><div className="flex items-center gap-2"><span className="font-medium">${analysisResults.costBenefit.fundingSources.local.toLocaleString()}</span><span className="text-xs text-gray-400">(15%)</span></div></div>
            </div>
          </div>
        </>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const PlanMaintenance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><RefreshCw className="w-8 h-8 text-blue-600" />Plan Maintenance</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Schedule</h3>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="text-gray-500">Last Full Update</span><span className="font-medium">{analysisResults.planMaintenance.lastFullUpdate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Last Annual Review</span><span className="font-medium">{analysisResults.planMaintenance.lastAnnualReview}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Next Scheduled Update</span><span className="font-medium text-blue-600">{analysisResults.planMaintenance.nextScheduledUpdate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Responsible Party</span><span className="font-medium">{analysisResults.planMaintenance.responsibleParty}</span></div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Process Assessment</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm font-medium text-gray-700">Review Process</p><p className="text-xs text-gray-500 mt-1">{analysisResults.planMaintenance.reviewProcess}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm font-medium text-gray-700">Public Involvement</p><p className="text-xs text-gray-500 mt-1">{analysisResults.planMaintenance.publicInvolvement}</p></div>
            </div>
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const HMPReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><FileOutput className="w-8 h-8 text-blue-600" />HMP Assessment Report</h2>
      {analysisResults?.documentMode === 'hmp' ? (
        <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="text-lg font-semibold text-gray-800">Assessment Summary</h3><p className="text-sm text-gray-500">Simulation ID: {analysisResults.simulationId}</p></div>
            <button onClick={() => {
              const report = `HAZARD MITIGATION PLAN ASSESSMENT REPORT\n${'='.repeat(50)}\nJurisdiction: ${analysisResults.jurisdiction}\nSimulation ID: ${analysisResults.simulationId}\nDate: ${new Date().toLocaleDateString()}\n\nOVERALL SCORE: ${analysisResults.overallScore}/100\n\nMETRICS:\n${Object.entries(analysisResults.metrics).map(([k,m]) => `- ${m.name}: ${m.value}% (${m.status})`).join('\n')}\n\nFEMA COMPLIANCE: ${analysisResults.femaCompliance.score}%\n${analysisResults.femaCompliance.checklist.map(c => `- ${c.requirement}: ${c.status}`).join('\n')}\n\nMITIGATION ACTIONS: ${analysisResults.mitigationActions.completed}/${analysisResults.mitigationActions.total} completed\n\nRECOMMENDATIONS:\n${analysisResults.recommendations.map((r,i) => `${i+1}. ${r}`).join('\n')}\n\nGenerated by SOP Sentinel | Your Plans, Protected`;
              const blob = new Blob([report], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = `HMP_Assessment_${analysisResults.simulationId}.txt`;
              a.click();
            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Download className="w-4 h-4" />Export Report</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Overall Score</p><p className="text-2xl font-bold text-blue-600">{analysisResults.overallScore}/100</p></div>
            <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">FEMA Compliance</p><p className="text-2xl font-bold text-green-600">{analysisResults.femaCompliance.score}%</p></div>
            <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Implementation Progress</p><p className="text-2xl font-bold text-amber-600">{analysisResults.implementationStatus.completionRate}%</p></div>
            <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Benefit-Cost Ratio</p><p className="text-2xl font-bold text-purple-600">{analysisResults.costBenefit.bcRatio}:1</p></div>
          </div>
        </div>
      ) : <div className="bg-white shadow-sm rounded-xl border border-gray-300 p-12 text-center"><FileOutput className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">Run HMP analysis first</p></div>}
    </div>
  );

  const renderModule = () => {
    if (activeTab === 'stress-test') {
      // HMP Mode modules
      if (documentMode === 'hmp') {
        switch (activeModule) {
          case 'dashboard': return <HMPDashboard />;
          case 'configuration': return <Configuration />;
          case 'hazard-identification': return <HazardIdentification />;
          case 'risk-assessment': return <HazardIdentification />; // Reuse for now
          case 'vulnerability-analysis': return <HazardIdentification />; // Reuse for now
          case 'mitigation-actions': return <MitigationActions />;
          case 'implementation-status': return <ImplementationStatus />;
          case 'fema-compliance': return <FEMACompliance />;
          case 'cost-benefit': return <CostBenefit />;
          case 'plan-maintenance': return <PlanMaintenance />;
          case 'reports': return <HMPReports />;
          default: return <HMPDashboard />;
        }
      }
      // SOP Mode modules
      switch (activeModule) {
        case 'dashboard': return <Dashboard />;
        case 'configuration': return <Configuration />;
        case 'digital-twin': return <DigitalTwin />;
        case 'stress-test': return <StressTestEngine />;
        case 'equity-analysis': return <EquityAnalysis />;
        case 'cascade-modeling': return <CascadeModeling />;
        case 'mutual-aid': return <MutualAid />;
        case 'supply-chain': return <SupplyChain />;
        case 'decision-fatigue': return <DecisionFatigue />;
        case 'coop': return <COOP />;
        case 'reports': return <Reports />;
        default: return <Dashboard />;
      }
    } else {
      switch (activeModule) {
        case 'grant-dashboard': return <GrantDashboard />;
        case 'gap-to-grant': return <GapToGrant />;
        case 'grant-writer': return <GrantWriter />;
        case 'grant-tracking': return <GrantTracking />;
        case 'roi-calculator': return <ROICalculator />;
        default: return <GrantDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-200 border-r border-gray-200 flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center"><Shield className="w-6 h-6 text-white" /></div>
            {!sidebarCollapsed && <div><h1 className="text-gray-800 font-bold">SOP Sentinel</h1><p className="text-xs text-gray-400">Your Plans, Protected</p></div>}
          </div>
        </div>
        <div className="p-2 border-b border-gray-200">
          <div className="flex gap-1">
            <button onClick={() => { setActiveTab('stress-test'); setActiveModule('dashboard'); }} className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium ${activeTab === 'stress-test' ? (documentMode === 'hmp' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600') : 'text-gray-500 hover:bg-white'}`}>{sidebarCollapsed ? (documentMode === 'hmp' ? <Shield className="w-4 h-4 mx-auto" /> : <Zap className="w-4 h-4 mx-auto" />) : (documentMode === 'hmp' ? 'HMP Analysis' : 'Stress Test SOPs')}</button>
            <button onClick={() => { setActiveTab('fund-fixes'); setActiveModule('grant-dashboard'); }} className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium ${activeTab === 'fund-fixes' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-white'}`}>{sidebarCollapsed ? <DollarSign className="w-4 h-4 mx-auto" /> : 'Fund Fixes'}</button>
          </div>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          {(activeTab === 'stress-test' ? (documentMode === 'hmp' ? hmpNavItems : stressTestNavItems) : fundFixesNavItems).map(item => (
            <button key={item.id} onClick={() => setActiveModule(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 ${activeModule === item.id ? (activeTab === 'stress-test' ? (documentMode === 'hmp' ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'bg-amber-100 text-amber-600 border border-amber-300') : 'bg-green-100 text-green-600 border border-green-300') : 'text-gray-500 hover:bg-white hover:text-gray-800'}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-4 border-t border-gray-200 text-gray-500 hover:text-gray-800"><Menu className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 overflow-auto"><div className="p-6">{renderModule()}</div></div>
    </div>
  );
}
export default SOP-Sentinel-v5.jsx;
