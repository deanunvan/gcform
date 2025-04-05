import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { useBuyerContext } from '../../context/BuyerContext';
import mainLogo from '../Images/main logo.png';
import helmet from '../Images/two.png';
import './Pages.css';

// Country data array
const countries = [
  { value: "+93", country: "AF", display: "🇦🇫 Afghanistan +93" },
  { value: "+355", country: "AL", display: "🇦🇱 Albania +355" },
  { value: "+213", country: "DZ", display: "🇩🇿 Algeria +213" },
  { value: "+376", country: "AD", display: "🇦🇩 Andorra +376" },
  { value: "+244", country: "AO", display: "🇦🇴 Angola +244" },
  { value: "+1", country: "AG", display: "🇦🇬 Antigua and Barbuda +1" },
  { value: "+54", country: "AR", display: "🇦🇷 Argentina +54" },
  { value: "+374", country: "AM", display: "🇦🇲 Armenia +374" },
  { value: "+61", country: "AU", display: "🇦🇺 Australia +61" },
  { value: "+43", country: "AT", display: "🇦🇹 Austria +43" },
  { value: "+994", country: "AZ", display: "🇦🇿 Azerbaijan +994" },
  { value: "+1", country: "BS", display: "🇧🇸 Bahamas +1" },
  { value: "+973", country: "BH", display: "🇧🇭 Bahrain +973" },
  { value: "+880", country: "BD", display: "🇧🇩 Bangladesh +880" },
  { value: "+1", country: "BB", display: "🇧🇧 Barbados +1" },
  { value: "+375", country: "BY", display: "🇧🇾 Belarus +375" },
  { value: "+32", country: "BE", display: "🇧🇪 Belgium +32" },
  { value: "+501", country: "BZ", display: "🇧🇿 Belize +501" },
  { value: "+229", country: "BJ", display: "🇧🇯 Benin +229" },
  { value: "+975", country: "BT", display: "🇧🇹 Bhutan +975" },
  { value: "+591", country: "BO", display: "🇧🇴 Bolivia +591" },
  { value: "+387", country: "BA", display: "🇧🇦 Bosnia and Herzegovina +387" },
  { value: "+267", country: "BW", display: "🇧🇼 Botswana +267" },
  { value: "+55", country: "BR", display: "🇧🇷 Brazil +55" },
  { value: "+673", country: "BN", display: "🇧🇳 Brunei +673" },
  { value: "+359", country: "BG", display: "🇧🇬 Bulgaria +359" },
  { value: "+226", country: "BF", display: "🇧🇫 Burkina Faso +226" },
  { value: "+257", country: "BI", display: "🇧🇮 Burundi +257" },
  { value: "+855", country: "KH", display: "🇰🇭 Cambodia +855" },
  { value: "+237", country: "CM", display: "🇨🇲 Cameroon +237" },
  { value: "+1", country: "CA", display: "🇨🇦 Canada +1" },
  { value: "+238", country: "CV", display: "🇨🇻 Cape Verde +238" },
  { value: "+236", country: "CF", display: "🇨🇫 Central African Republic +236" },
  { value: "+235", country: "TD", display: "🇹🇩 Chad +235" },
  { value: "+56", country: "CL", display: "🇨🇱 Chile +56" },
  { value: "+86", country: "CN", display: "🇨🇳 China +86" },
  { value: "+57", country: "CO", display: "🇨🇴 Colombia +57" },
  { value: "+269", country: "KM", display: "🇰🇲 Comoros +269" },
  { value: "+242", country: "CG", display: "🇨🇬 Congo +242" },
  { value: "+506", country: "CR", display: "🇨🇷 Costa Rica +506" },
  { value: "+385", country: "HR", display: "🇭🇷 Croatia +385" },
  { value: "+53", country: "CU", display: "🇨🇺 Cuba +53" },
  { value: "+357", country: "CY", display: "🇨🇾 Cyprus +357" },
  { value: "+420", country: "CZ", display: "🇨🇿 Czech Republic +420" },
  { value: "+45", country: "DK", display: "🇩🇰 Denmark +45" },
  { value: "+253", country: "DJ", display: "🇩🇯 Djibouti +253" },
  { value: "+1", country: "DM", display: "🇩🇲 Dominica +1" },
  { value: "+1", country: "DO", display: "🇩🇴 Dominican Republic +1" },
  { value: "+670", country: "TL", display: "🇹🇱 East Timor +670" },
  { value: "+593", country: "EC", display: "🇪🇨 Ecuador +593" },
  { value: "+20", country: "EG", display: "🇪🇬 Egypt +20" },
  { value: "+503", country: "SV", display: "🇸🇻 El Salvador +503" },
  { value: "+240", country: "GQ", display: "🇬🇶 Equatorial Guinea +240" },
  { value: "+291", country: "ER", display: "🇪🇷 Eritrea +291" },
  { value: "+372", country: "EE", display: "🇪🇪 Estonia +372" },
  { value: "+251", country: "ET", display: "🇪🇹 Ethiopia +251" },
  { value: "+679", country: "FJ", display: "🇫🇯 Fiji +679" },
  { value: "+358", country: "FI", display: "🇫🇮 Finland +358" },
  { value: "+33", country: "FR", display: "🇫🇷 France +33" },
  { value: "+241", country: "GA", display: "🇬🇦 Gabon +241" },
  { value: "+220", country: "GM", display: "🇬🇲 Gambia +220" },
  { value: "+995", country: "GE", display: "🇬🇪 Georgia +995" },
  { value: "+49", country: "DE", display: "🇩🇪 Germany +49" },
  { value: "+233", country: "GH", display: "🇬🇭 Ghana +233" },
  { value: "+30", country: "GR", display: "🇬🇷 Greece +30" },
  { value: "+1", country: "GD", display: "🇬🇩 Grenada +1" },
  { value: "+502", country: "GT", display: "🇬🇹 Guatemala +502" },
  { value: "+224", country: "GN", display: "🇬🇳 Guinea +224" },
  { value: "+245", country: "GW", display: "🇬🇼 Guinea-Bissau +245" },
  { value: "+592", country: "GY", display: "🇬🇾 Guyana +592" },
  { value: "+509", country: "HT", display: "🇭🇹 Haiti +509" },
  { value: "+504", country: "HN", display: "🇭🇳 Honduras +504" },
  { value: "+852", country: "HK", display: "🇭🇰 Hong Kong +852" },
  { value: "+36", country: "HU", display: "🇭🇺 Hungary +36" },
  { value: "+354", country: "IS", display: "🇮🇸 Iceland +354" },
  { value: "+91", country: "IN", display: "🇮🇳 India +91" },
  { value: "+62", country: "ID", display: "🇮🇩 Indonesia +62" },
  { value: "+98", country: "IR", display: "🇮🇷 Iran +98" },
  { value: "+964", country: "IQ", display: "🇮🇶 Iraq +964" },
  { value: "+353", country: "IE", display: "🇮🇪 Ireland +353" },
  { value: "+972", country: "IL", display: "🇮🇱 Israel +972" },
  { value: "+39", country: "IT", display: "🇮🇹 Italy +39" },
  { value: "+1", country: "JM", display: "🇯🇲 Jamaica +1" },
  { value: "+81", country: "JP", display: "🇯🇵 Japan +81" },
  { value: "+962", country: "JO", display: "🇯🇴 Jordan +962" },
  { value: "+7", country: "KZ", display: "🇰🇿 Kazakhstan +7" },
  { value: "+254", country: "KE", display: "🇰🇪 Kenya +254" },
  { value: "+686", country: "KI", display: "🇰🇮 Kiribati +686" },
  { value: "+850", country: "KP", display: "🇰🇵 North Korea +850" },
  { value: "+82", country: "KR", display: "🇰🇷 South Korea +82" },
  { value: "+965", country: "KW", display: "🇰🇼 Kuwait +965" },
  { value: "+996", country: "KG", display: "🇰🇬 Kyrgyzstan +996" },
  { value: "+856", country: "LA", display: "🇱🇦 Laos +856" },
  { value: "+371", country: "LV", display: "🇱🇻 Latvia +371" },
  { value: "+961", country: "LB", display: "🇱🇧 Lebanon +961" },
  { value: "+266", country: "LS", display: "🇱🇸 Lesotho +266" },
  { value: "+231", country: "LR", display: "🇱🇷 Liberia +231" },
  { value: "+218", country: "LY", display: "🇱🇾 Libya +218" },
  { value: "+423", country: "LI", display: "🇱🇮 Liechtenstein +423" },
  { value: "+370", country: "LT", display: "🇱🇹 Lithuania +370" },
  { value: "+352", country: "LU", display: "🇱🇺 Luxembourg +352" },
  { value: "+853", country: "MO", display: "🇲🇴 Macau +853" },
  { value: "+389", country: "MK", display: "🇲🇰 Macedonia +389" },
  { value: "+261", country: "MG", display: "🇲🇬 Madagascar +261" },
  { value: "+265", country: "MW", display: "🇲🇼 Malawi +265" },
  { value: "+60", country: "MY", display: "🇲🇾 Malaysia +60" },
  { value: "+960", country: "MV", display: "🇲🇻 Maldives +960" },
  { value: "+223", country: "ML", display: "🇲🇱 Mali +223" },
  { value: "+356", country: "MT", display: "🇲🇹 Malta +356" },
  { value: "+692", country: "MH", display: "🇲🇭 Marshall Islands +692" },
  { value: "+222", country: "MR", display: "🇲🇷 Mauritania +222" },
  { value: "+230", country: "MU", display: "🇲🇺 Mauritius +230" },
  { value: "+52", country: "MX", display: "🇲🇽 Mexico +52" },
  { value: "+691", country: "FM", display: "🇫🇲 Micronesia +691" },
  { value: "+373", country: "MD", display: "🇲🇩 Moldova +373" },
  { value: "+377", country: "MC", display: "🇲🇨 Monaco +377" },
  { value: "+976", country: "MN", display: "🇲🇳 Mongolia +976" },
  { value: "+382", country: "ME", display: "🇲🇪 Montenegro +382" },
  { value: "+212", country: "MA", display: "🇲🇦 Morocco +212" },
  { value: "+258", country: "MZ", display: "🇲🇿 Mozambique +258" },
  { value: "+95", country: "MM", display: "🇲🇲 Myanmar +95" },
  { value: "+264", country: "NA", display: "🇳🇦 Namibia +264" },
  { value: "+674", country: "NR", display: "🇳🇷 Nauru +674" },
  { value: "+977", country: "NP", display: "🇳🇵 Nepal +977" },
  { value: "+31", country: "NL", display: "🇳🇱 Netherlands +31" },
  { value: "+64", country: "NZ", display: "🇳🇿 New Zealand +64" },
  { value: "+505", country: "NI", display: "🇳🇮 Nicaragua +505" },
  { value: "+227", country: "NE", display: "🇳🇪 Niger +227" },
  { value: "+234", country: "NG", display: "🇳🇬 Nigeria +234" },
  { value: "+47", country: "NO", display: "🇳🇴 Norway +47" },
  { value: "+968", country: "OM", display: "🇴🇲 Oman +968" },
  { value: "+92", country: "PK", display: "🇵🇰 Pakistan +92" },
  { value: "+680", country: "PW", display: "🇵🇼 Palau +680" },
  { value: "+970", country: "PS", display: "🇵🇸 Palestine +970" },
  { value: "+507", country: "PA", display: "🇵🇦 Panama +507" },
  { value: "+675", country: "PG", display: "🇵🇬 Papua New Guinea +675" },
  { value: "+595", country: "PY", display: "🇵🇾 Paraguay +595" },
  { value: "+51", country: "PE", display: "🇵🇪 Peru +51" },
  { value: "+63", country: "PH", display: "🇵🇭 Philippines +63" },
  { value: "+48", country: "PL", display: "🇵🇱 Poland +48" },
  { value: "+351", country: "PT", display: "🇵🇹 Portugal +351" },
  { value: "+974", country: "QA", display: "🇶🇦 Qatar +974" },
  { value: "+40", country: "RO", display: "🇷🇴 Romania +40" },
  { value: "+7", country: "RU", display: "🇷🇺 Russia +7" },
  { value: "+250", country: "RW", display: "🇷🇼 Rwanda +250" },
  { value: "+1", country: "KN", display: "🇰🇳 Saint Kitts and Nevis +1" },
  { value: "+1", country: "LC", display: "🇱🇨 Saint Lucia +1" },
  { value: "+1", country: "VC", display: "🇻🇨 Saint Vincent and the Grenadines +1" },
  { value: "+685", country: "WS", display: "🇼🇸 Samoa +685" },
  { value: "+378", country: "SM", display: "🇸🇲 San Marino +378" },
  { value: "+239", country: "ST", display: "🇸🇹 Sao Tome and Principe +239" },
  { value: "+966", country: "SA", display: "🇸🇦 Saudi Arabia +966" },
  { value: "+221", country: "SN", display: "🇸🇳 Senegal +221" },
  { value: "+381", country: "RS", display: "🇷🇸 Serbia +381" },
  { value: "+248", country: "SC", display: "🇸🇨 Seychelles +248" },
  { value: "+232", country: "SL", display: "🇸🇱 Sierra Leone +232" },
  { value: "+65", country: "SG", display: "🇸🇬 Singapore +65" },
  { value: "+421", country: "SK", display: "🇸🇰 Slovakia +421" },
  { value: "+386", country: "SI", display: "🇸🇮 Slovenia +386" },
  { value: "+677", country: "SB", display: "🇸🇧 Solomon Islands +677" },
  { value: "+252", country: "SO", display: "🇸🇴 Somalia +252" },
  { value: "+27", country: "ZA", display: "🇿🇦 South Africa +27" },
  { value: "+211", country: "SS", display: "🇸🇸 South Sudan +211" },
  { value: "+34", country: "ES", display: "🇪🇸 Spain +34" },
  { value: "+94", country: "LK", display: "🇱🇰 Sri Lanka +94" },
  { value: "+249", country: "SD", display: "🇸🇩 Sudan +249" },
  { value: "+597", country: "SR", display: "🇸🇷 Suriname +597" },
  { value: "+268", country: "SZ", display: "🇸🇿 Swaziland +268" },
  { value: "+46", country: "SE", display: "🇸🇪 Sweden +46" },
  { value: "+41", country: "CH", display: "🇨🇭 Switzerland +41" },
  { value: "+963", country: "SY", display: "🇸🇾 Syria +963" },
  { value: "+886", country: "TW", display: "🇹🇼 Taiwan +886" },
  { value: "+992", country: "TJ", display: "🇹🇯 Tajikistan +992" },
  { value: "+255", country: "TZ", display: "🇹🇿 Tanzania +255" },
  { value: "+66", country: "TH", display: "🇹🇭 Thailand +66" },
  { value: "+228", country: "TG", display: "🇹🇬 Togo +228" },
  { value: "+676", country: "TO", display: "🇹🇴 Tonga +676" },
  { value: "+1", country: "TT", display: "🇹🇹 Trinidad and Tobago +1" },
  { value: "+216", country: "TN", display: "🇹🇳 Tunisia +216" },
  { value: "+90", country: "TR", display: "🇹🇷 Turkey +90" },
  { value: "+993", country: "TM", display: "🇹🇲 Turkmenistan +993" },
  { value: "+688", country: "TV", display: "🇹🇻 Tuvalu +688" },
  { value: "+256", country: "UG", display: "🇺🇬 Uganda +256" },
  { value: "+380", country: "UA", display: "🇺🇦 Ukraine +380" },
  { value: "+971", country: "AE", display: "🇦🇪 United Arab Emirates +971" },
  { value: "+44", country: "GB", display: "🇬🇧 United Kingdom +44" },
  { value: "+1", country: "US", display: "🇺🇸 United States +1" },
  { value: "+598", country: "UY", display: "🇺🇾 Uruguay +598" },
  { value: "+998", country: "UZ", display: "🇺🇿 Uzbekistan +998" },
  { value: "+678", country: "VU", display: "🇻🇺 Vanuatu +678" },
  { value: "+379", country: "VA", display: "🇻🇦 Vatican City +379" },
  { value: "+58", country: "VE", display: "🇻🇪 Venezuela +58" },
  { value: "+84", country: "VN", display: "🇻🇳 Vietnam +84" },
  { value: "+967", country: "YE", display: "🇾🇪 Yemen +967" },
  { value: "+260", country: "ZM", display: "🇿🇲 Zambia +260" },
  { value: "+263", country: "ZW", display: "🇿🇼 Zimbabwe +263" }
];

export const Buyform = () => {
  const navigate = useNavigate();
  const { buyerData, updatePersonalInfo } = useBuyerContext();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // isOpen controls whether the custom dropdown list is expanded
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: buyerData.personalInfo.name,
    email: buyerData.personalInfo.email,
    phone: buyerData.personalInfo.phone,
    countryCode: buyerData.personalInfo.countryCode // expected to be one of the country "value"s
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send data to external service
    const url = "https://script.google.com/macros/s/AKfycbyL_h7LSONlLuH-Z1TY2ClE9rfvd5AzOgi7zHT3FNckZ2kN_sSWMhLeftGTbI0gWlku/exec";
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `Name=${e.target.name.value}&Email=${e.target.email.value}&CountryCode=${e.target.countryCode.value}&Phone=${e.target.phone.value}`
    })
      .then(res => res.text())
      .then(data => alert(data))
      .catch(error => console.log(error));

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await updatePersonalInfo(formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/buyqn1');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Determine the selected country based on the countryCode in formData
  const selectedCountry = countries.find(c => c.value === formData.countryCode);

  // Handle selection from our custom dropdown list
  const handleSelectCountry = (countryValue) => {
    setFormData(prev => ({ ...prev, countryCode: countryValue }));
    setIsOpen(false);
  };

  return (
    <div className="buyform">
      <img className="logo2" src={mainLogo} alt="Groundcentered Logo" />
      <div className="container">
        <div className="left-section">
          <h1>Hi, Welcome Buyer!</h1>
          <img src={helmet} alt="Yellow Safety Helmet" className="helmet-img" />
          <Link to="/" className="back-btn">←</Link>
        </div>

        <div className="right-section">
          <h2 className='join'>Join Our Waiting List.</h2>
          <form id="buyerForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name :"
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email :"
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className="input-group">
              <div className="phone-input" style={{ position: 'relative' }}>
                {/* Custom Dropdown – always rendered.
                    The closed view shows only the flag and a dropdown arrow,
                    and when clicked the full list of options is displayed floating on top. */}
                <div className="dropdown">
                  <div 
                    className="dropdown-selected" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ 
                      cursor: 'pointer', 
                      fontSize: '18px', 
                      border: '1px solid #ccc', 
                      padding: '3px', 
                      width: '50px',
                      color: 'black',
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {selectedCountry ? selectedCountry.display.split(' ')[0] : '🌐'}
                    <span style={{ marginLeft: '4px', fontSize: '14px', color: '#ccc', }}>▼</span>
                  </div>
                  {isOpen && (
                    <ul 
                      className="dropdown-list" 
                      style={{ 
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        border: '1px solid #ccc', 
                        margin: 0, 
                        padding: '5px', 
                        listStyle: 'none', 
                        maxHeight: '500px', 
                        overflowY: 'auto',
                        color: 'white',
                        backgroundColor: 'black',
                        width: '70%',
                        height: '500px',
                        marginTop: '-330px',
                        marginLeft: '100px',
                      }}
                    >
                      {countries.map((country) => (
                        <li 
                          key={`${country.country}-${country.value}`} 
                          onClick={() => handleSelectCountry(country.value)}
                          style={{ padding: '5px', cursor: 'pointer' }}
                        >
                          {country.display}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Hidden input to preserve the country code in the form submission */}
                <input 
                  type="hidden" 
                  id="country-code" 
                  name="countryCode" 
                  value={formData.countryCode} 
                  onChange={handleChange} 
                />

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className={formErrors.phone ? 'error' : ''}
                />
              </div>
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>

            <p className="question-text">Answer a few questions ...!</p>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Get Started!'}
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>groundcentered.com © 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};