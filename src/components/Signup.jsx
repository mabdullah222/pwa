import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const languages = [
        { "code": "ab", "name": "Abkhaz", "nativeName": "аҧсуа" },
        { "code": "aa", "name": "Afar", "nativeName": "Afaraf" },
        { "code": "af", "name": "Afrikaans", "nativeName": "Afrikaans" },
        { "code": "ak", "name": "Akan", "nativeName": "Akan" },
        { "code": "sq", "name": "Albanian", "nativeName": "Shqip" },
        { "code": "am", "name": "Amharic", "nativeName": "አማርኛ" },
        { "code": "ar", "name": "Arabic", "nativeName": "العربية" },
        { "code": "an", "name": "Aragonese", "nativeName": "Aragonés" },
        { "code": "hy", "name": "Armenian", "nativeName": "Հայերեն" },
        { "code": "as", "name": "Assamese", "nativeName": "অসমীয়া" },
        { "code": "av", "name": "Avaric", "nativeName": "авар мацӀ, магӀарул мацӀ" },
        { "code": "ae", "name": "Avestan", "nativeName": "avesta" },
        { "code": "ay", "name": "Aymara", "nativeName": "aymar aru" },
        { "code": "az", "name": "Azerbaijani", "nativeName": "azərbaycan dili" },
        { "code": "bm", "name": "Bambara", "nativeName": "bamanankan" },
        { "code": "ba", "name": "Bashkir", "nativeName": "башҡорт теле" },
        { "code": "eu", "name": "Basque", "nativeName": "euskara, euskera" },
        { "code": "be", "name": "Belarusian", "nativeName": "Беларуская" },
        { "code": "bn", "name": "Bengali", "nativeName": "বাংলা" },
        { "code": "bh", "name": "Bihari", "nativeName": "भोजपुरी" },
        { "code": "bi", "name": "Bislama", "nativeName": "Bislama" },
        { "code": "bs", "name": "Bosnian", "nativeName": "bosanski jezik" },
        { "code": "br", "name": "Breton", "nativeName": "brezhoneg" },
        { "code": "bg", "name": "Bulgarian", "nativeName": "български език" },
        { "code": "my", "name": "Burmese", "nativeName": "ဗမာစာ" },
        { "code": "ca", "name": "Catalan; Valencian", "nativeName": "Català" },
        { "code": "ch", "name": "Chamorro", "nativeName": "Chamoru" },
        { "code": "ce", "name": "Chechen", "nativeName": "нохчийн мотт" },
        { "code": "ny", "name": "Chichewa; Chewa; Nyanja", "nativeName": "chiCheŵa, chinyanja" },
        { "code": "zh", "name": "Chinese", "nativeName": "中文 (Zhōngwén), 汉语, 漢語" },
        { "code": "cv", "name": "Chuvash", "nativeName": "чӑваш чӗлхи" },
        { "code": "kw", "name": "Cornish", "nativeName": "Kernewek" },
        { "code": "co", "name": "Corsican", "nativeName": "corsu, lingua corsa" },
        { "code": "cr", "name": "Cree", "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ" },
        { "code": "hr", "name": "Croatian", "nativeName": "hrvatski" },
        { "code": "cs", "name": "Czech", "nativeName": "česky, čeština" },
        { "code": "da", "name": "Danish", "nativeName": "dansk" },
        { "code": "dv", "name": "Divehi; Dhivehi; Maldivian;", "nativeName": "ދިވެހި" },
        { "code": "nl", "name": "Dutch", "nativeName": "Nederlands, Vlaams" },
        { "code": "en", "name": "English", "nativeName": "English" },
        { "code": "eo", "name": "Esperanto", "nativeName": "Esperanto" },
        { "code": "et", "name": "Estonian" },
        { "code": "ee", "name": "Ewe" },
        { "code": "fo", "name": "Faroese", "nativeName": "føroyskt" },
        { "code": "fj", "name": "Fijian", "nativeName": "vosa Vakaviti" },
        { "code": "fi", "name": "Finnish", "nativeName": "suomi, suomen kieli" },
        { "code": "fr", "name": "French", "nativeName": "français, langue française" },
        { "code": "ff", "name": "Fula; Fulah; Pulaar; Pular", "nativeName": "Fulfulde, Pulaar, Pular" },
        { "code": "gl", "name": "Galician", "nativeName": "Galego" },
        { "code": "ka", "name": "Georgian", "nativeName": "ქართული" },
        { "code": "de", "name": "German", "nativeName": "Deutsch" },
        { "code": "el", "name": "Greek, Modern", "nativeName": "Ελληνικά" },
        { "code": "gn", "name": "Guaraní", "nativeName": "Avañeẽ" },
        { "code": "gu", "name": "Gujarati", "nativeName": "ગુજરાતી" },
        { "code": "ht", "name": "Haitian; Haitian Creole", "nativeName": "Kreyòl ayisyen" },
        { "code": "ha", "name": "Hausa", "nativeName": "Hausa, هَوُسَ" },
        { "code": "he", "name": "Hebrew (modern)", "nativeName": "עברית" },
        { "code": "hz", "name": "Herero", "nativeName": "Otjiherero" },
        { "code": "hi", "name": "Hindi", "nativeName": "हिन्दी, हिंदी" },
        { "code": "ho", "name": "Hiri Motu", "nativeName": "Hiri Motu" },
        { "code": "hu", "name": "Hungarian", "nativeName": "Magyar" },
        { "code": "ia", "name": "Interlingua", "nativeName": "Interlingua" },
        { "code": "id", "name": "Indonesian", "nativeName": "Bahasa Indonesia" },
        { "code": "ie", "name": "Interlingue", "nativeName": "Originally called Occidental; then Interlingue after WWII" },
        { "code": "ga", "name": "Irish", "nativeName": "Gaeilge" },
        { "code": "ig", "name": "Igbo", "nativeName": "Asụsụ Igbo" },
        { "code": "ik", "name": "Inupiaq", "nativeName": "Iñupiaq, Iñupiatun" },
        { "code": "io", "name": "Ido", "nativeName": "Ido" },
        { "code": "is", "name": "Icelandic", "nativeName": "Íslenska" },
        { "code": "it", "name": "Italian", "nativeName": "Italiano" },
        { "code": "iu", "name": "Inuktitut", "nativeName": "ᐃᓄᒃᑎᑐᑦ" },
        { "code": "ja", "name": "Japanese", "nativeName": "日本語 (にほんご／にっぽんご)" },
        { "code": "jv", "name": "Javanese", "nativeName": "basa Jawa" },
        { "code": "kl", "name": "Kalaallisut, Greenlandic", "nativeName": "kalaallisut, kalaallit oqaasii" },
        { "code": "kn", "name": "Kannada", "nativeName": "ಕನ್ನಡ" },
        { "code": "kr", "name": "Kanuri", "nativeName": "Kanuri" },
        { "code": "ks", "name": "Kashmiri", "nativeName": "कश्मीरी, كشميري" },
        { "code": "kk", "name": "Kazakh", "nativeName": "Қазақ тілі" },
        { "code": "km", "name": "Khmer", "nativeName": "ភាសាខ្មែរ" },
        { "code": "ki", "name": "Kikuyu, Gikuyu", "nativeName": "Gĩkũyũ" },
        { "code": "rw", "name": "Kinyarwanda", "nativeName": "Ikinyarwanda" },
        { "code": "ky", "name": "Kirghiz, Kyrgyz", "nativeName": "кыргыз тили" },
        { "code": "kv", "name": "Komi", "nativeName": "коми кыв" },
        { "code": "kg", "name": "Kongo", "nativeName": "KiKongo" },
        { "code": "ko", "name": "Korean", "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)" },
        { "code": "ku", "name": "Kurdish", "nativeName": "Kurdî, كوردی" },
        { "code": "kj", "name": "Kwanyama, Kuanyama", "nativeName": "Kuanyama" },
        { "code": "la", "name": "Latin", "nativeName": "latine, lingua latina" },
        { "code": "lb", "name": "Luxembourgish, Letzeburgesch", "nativeName": "Lëtzebuergesch" },
        { "code": "lg", "name": "Luganda", "nativeName": "Luganda" },
        { "code": "li", "name": "Limburgish, Limburgan, Limburger", "nativeName": "Limburgs" },
        { "code": "ln", "name": "Lingala", "nativeName": "Lingála" },
        { "code": "lo", "name": "Lao", "nativeName": "ພາສາລາວ" },
        { "code": "lt", "name": "Lithuanian", "nativeName": "lietuvių kalba" },
        { "code": "lu", "name": "Luba-Katanga", "nativeName": "" },
        { "code": "lv", "name": "Latvian", "nativeName": "latviešu valoda" },
        { "code": "gv", "name": "Manx", "nativeName": "Gaelg, Gailck" },
        { "code": "mk", "name": "Macedonian", "nativeName": "македонски јазик" },
        { "code": "mg", "name": "Malagasy", "nativeName": "Malagasy fiteny" },
        { "code": "ms", "name": "Malay", "nativeName": "bahasa Melayu, بهاس ملايو" },
        { "code": "ml", "name": "Malayalam", "nativeName": "മലയാളം" },
        { "code": "mt", "name": "Maltese", "nativeName": "Malti" },
        { "code": "mi", "name": "Māori", "nativeName": "te reo Māori" },
        { "code": "mr", "name": "Marathi (Marāṭhī)", "nativeName": "मराठी" },
        { "code": "mh", "name": "Marshallese", "nativeName": "Kajin M̧ajeļ" },
        { "code": "mn", "name": "Mongolian", "nativeName": "монгол" },
        { "code": "na", "name": "Nauru", "nativeName": "Ekakairũ Naoero" },
        { "code": "nv", "name": "Navajo, Navaho", "nativeName": "Diné bizaad, Dinékehǰí" },
        { "code": "nb", "name": "Norwegian Bokmål", "nativeName": "Norsk bokmål" },
        { "code": "nd", "name": "North Ndebele", "nativeName": "isiNdebele" },
        { "code": "ne", "name": "Nepali", "nativeName": "नेपाली" },
        { "code": "ng", "name": "Ndonga", "nativeName": "Owambo" },
        { "code": "nn", "name": "Norwegian Nynorsk", "nativeName": "Norsk nynorsk" },
        { "code": "no", "name": "Norwegian", "nativeName": "Norsk" },
        { "code": "ii", "name": "Nuosu", "nativeName": "ꆈꌠ꒿ Nuosuhxop" },
        { "code": "nr", "name": "South Ndebele", "nativeName": "isiNdebele" },
        { "code": "oc", "name": "Occitan", "nativeName": "Occitan" },
        { "code": "oj", "name": "Ojibwe, Ojibwa", "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ" },
        { "code": "cu", "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic", "nativeName": "ѩзыкъ словѣньскъ" },
        { "code": "om", "name": "Oromo", "nativeName": "Afaan Oromoo" },
        { "code": "or", "name": "Oriya", "nativeName": "ଓଡ଼ିଆ" },
        { "code": "os", "name": "Ossetian, Ossetic", "nativeName": "ирон æвзаг" },
        { "code": "pa", "name": "Panjabi, Punjabi", "nativeName": "ਪੰਜਾਬੀ, پنجابی" },
        { "code": "pi", "name": "Pāli", "nativeName": "पाऴि" },
        { "code": "fa", "name": "Persian", "nativeName": "فارسی" },
        { "code": "pl", "name": "Polish", "nativeName": "polski" },
        { "code": "ps", "name": "Pashto, Pushto", "nativeName": "پښتو" },
        { "code": "pt", "name": "Portuguese", "nativeName": "Português" },
        { "code": "qu", "name": "Quechua", "nativeName": "Runa Simi, Kichwa" },
        { "code": "rm", "name": "Romansh", "nativeName": "rumantsch grischun" },
        { "code": "rn", "name": "Kirundi", "nativeName": "kiRundi" },
        { "code": "ro", "name": "Romanian, Moldavian, Moldovan", "nativeName": "română" },
        { "code": "ru", "name": "Russian", "nativeName": "русский язык" },
        { "code": "sa", "name": "Sanskrit (Saṁskṛta)", "nativeName": "संस्कृतम्" },
        { "code": "sc", "name": "Sardinian", "nativeName": "sardu" },
        { "code": "sd", "name": "Sindhi", "nativeName": "सिन्धी, سنڌي، سندھی" },
        { "code": "se", "name": "Northern Sami", "nativeName": "Davvisámegiella" },
        { "code": "sm", "name": "Samoan", "nativeName": "gagana faa Samoa" },
        { "code": "sg", "name": "Sango", "nativeName": "yângâ tî sängö" },
        { "code": "sr", "name": "Serbian", "nativeName": "српски језик" },
        { "code": "gd", "name": "Scottish Gaelic; Gaelic", "nativeName": "Gàidhlig" },
        { "code": "sn", "name": "Shona", "nativeName": "chiShona" },
        { "code": "si", "name": "Sinhala, Sinhalese", "nativeName": "සිංහල" },
        { "code": "sk", "name": "Slovak", "nativeName": "slovenčina" },
        { "code": "sl", "name": "Slovene", "nativeName": "slovenščina" },
        { "code": "so", "name": "Somali", "nativeName": "Soomaaliga, af Soomaali" },
        { "code": "st", "name": "Southern Sotho", "nativeName": "Sesotho" },
        { "code": "es", "name": "Spanish; Castilian", "nativeName": "español, castellano" },
        { "code": "su", "name": "Sundanese", "nativeName": "Basa Sunda" },
        { "code": "sw", "name": "Swahili", "nativeName": "Kiswahili" },
        { "code": "ss", "name": "Swati", "nativeName": "SiSwati" },
        { "code": "sv", "name": "Swedish", "nativeName": "svenska" },
        { "code": "ta", "name": "Tamil", "nativeName": "தமிழ்" },
        { "code": "te", "name": "Telugu", "nativeName": "తెలుగు" },
        { "code": "tg", "name": "Tajik", "nativeName": "тоҷикӣ, toğikī, تاجیکی" },
        { "code": "th", "name": "Thai", "nativeName": "ไทย" },
        { "code": "ti", "name": "Tigrinya", "nativeName": "ትግርኛ" },
        { "code": "bo", "name": "Tibetan Standard, Tibetan, Central", "nativeName": "བོད་ཡིག" },
        { "code": "tk", "name": "Turkmen", "nativeName": "Türkmen, Түркмен" },
        { "code": "tl", "name": "Tagalog", "nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔" },
        { "code": "tn", "name": "Tswana", "nativeName": "Setswana" },
        { "code": "to", "name": "Tonga (Tonga Islands)", "nativeName": "faka Tonga" },
        { "code": "tr", "name": "Turkish", "nativeName": "Türkçe" },
        { "code": "ts", "name": "Tsonga", "nativeName": "Xitsonga" },
        { "code": "tt", "name": "Tatar", "nativeName": "татарча, tatarça, تاتارچا" },
        { "code": "tw", "name": "Twi", "nativeName": "Twi" },
        { "code": "ty", "name": "Tahitian", "nativeName": "Reo Tahiti" },
        { "code": "ug", "name": "Uighur, Uyghur", "nativeName": "Uyƣurqə, ئۇيغۇرچە" },
        { "code": "uk", "name": "Ukrainian", "nativeName": "українська" },
        { "code": "ur", "name": "Urdu", "nativeName": "اردو" },
        { "code": "uz", "name": "Uzbek", "nativeName": "zbek, Ўзбек, أۇزبېك" },
        { "code": "ve", "name": "Venda", "nativeName": "Tshivenḓa" },
        { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt" },
        { "code": "vo", "name": "Volapük", "nativeName": "Volapük" },
        { "code": "wa", "name": "Walloon", "nativeName": "Walon" },
        { "code": "cy", "name": "Welsh", "nativeName": "Cymraeg" },
        { "code": "wo", "name": "Wolof", "nativeName": "Wollof" },
        { "code": "fy", "name": "Western Frisian", "nativeName": "Frysk" },
        { "code": "xh", "name": "Xhosa", "nativeName": "isiXhosa" },
        { "code": "yi", "name": "Yiddish", "nativeName": "ייִדיש" },
        { "code": "yo", "name": "Yoruba", "nativeName": "Yorùbá" },
        { "code": "za", "name": "Zhuang, Chuang", "nativeName": "Saw cueŋƅ, Saw cuengh" }]

function Signup() {

        let [passwordLevel1,setPasswordLevel1]=useState(false);
        let [passwordLevel2,setPasswordLevel2]=useState(false);
        let [passwordLevel3,setPasswordLevel3]=useState(false);
        const navigator = useNavigate();

        let [data, setData] = useState({ name: "", username: "", phone: "",password:"" });
        let handleInput = (e) => {
                setData({ ...data, [e.target.name]: e.target.value })
                if (e.target.name=='password'){
                        if (e.target.value.length>=8){
                                setPasswordLevel1(true)
                        }
                        if (e.target.value.length<8){
                                setPasswordLevel1(false)
                        }
                        if (e.target.value.match(/\d+/g))
                        {
                                setPasswordLevel3(true);
                        }
                        if (!e.target.value.match(/\d+/g)){
                                setPasswordLevel3(false);
                        }
                        if (e.target.value.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)){
                                setPasswordLevel2(true);
                        }
                        if (!e.target.value.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)){
                                setPasswordLevel2(false);
                        }
                        if (e.target.value.length==0){
                                setPasswordLevel2(false);
                        }
                }  
        }     
        let handleSignup = async (e) => {
                e.preventDefault();
                console.log(data)
                if (data.name && data.username && data.phone) {
                        let language = document.getElementById('language').value
                        let response = await axios.post("http://localhost:8000/api/signup", { ...data, language: language });
                        if (response.data.status == 200) {
                                localStorage.setItem("user", response.data.data.username);
                                localStorage.setItem("crops", JSON.stringify(response.data.data.crops));
                                LoginSuccess();
                                navigator("/dashboard");
                        } else {
                                LoginError(response.data.message);
                        }
                } else {
                        LoginError("Fill the Form");
                }
        };



        const LoginSuccess = () => {
                return toast.success("Signup Successful");
        };

        // Creating function to display toast message when login is unsuccessful.
        const LoginError = (message) => {
                return toast.error(message);
        };
        return (
                <div className="flex justify-center items-center h-full p-3 mt-12 laptop:mt-4">
                        <div className="m-3 mt-7 p-3 w-full laptop:w-2/3 laptop:p-6 border-4 bg-slate-200 rounded shadow-[-15px_15px_0_0px] shadow-emerald-500">
                                <form>
                                        <div class="form-group my-3 transition duration-100 hover:translate-x-1 hover:-translate-y-1">
                                                <label for="name" className="text-emerald-900 my-2">Full Name</label>
                                                <input
                                                        type="text"
                                                        class="form-control"
                                                        id="name"
                                                        aria-describedby="emailHelp"
                                                        name="name"
                                                        placeholder="John doe"
                                                        onChange={handleInput}
                                                />
                                        </div>
                                        <div class="form-group my-3 transition duration-100 hover:translate-x-1 hover:-translate-y-1">
                                                <label for="exampleInputEmail1" className="text-emerald-900 my-2">Username</label>
                                                <input
                                                        type="text"
                                                        class="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        name="username"
                                                        placeholder="John doe"
                                                        onChange={handleInput}
                                                />
                                        </div>
                                        <div class="form-group my-3 transition duration-100 hover:translate-x-1 hover:-translate-y-1">
                                                <label for="exampleInputPassword1" className="text-emerald-900 my-2">Phone Number</label>
                                                <input
                                                        type="text"
                                                        class="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="+92xxxxxxxxx"
                                                        name="phone"
                                                        onChange={handleInput}
                                                />
                                        </div>
                                        <div className="form-group my-3 transition duration-100 hover:translate-x-1 hover:-translate-y-1">
                                                <label for="language" className="text-emerald-900 my-2">Language</label>
                                                <select class="form-control" id="language">
                                                        {
                                                                languages.map(element => {
                                                                        return <option value={element.code}>{element.name}</option>
                                                                })
                                                        }
                                                </select>
                                        </div>
                                        
                                        <div class="form-group my-3 transition duration-100 hover:translate-x-1 hover:-translate-y-1">
                                                <label for="exampleInputPassword1" className="text-emerald-900 my-2">Password</label>
                                                <input
                                                        type="password"
                                                        class="form-control"
                                                        id="exampleInputPassword1"
                                                        name="password"
                                                        onChange={handleInput}
                                                />
                                                <ul style={{listStyle:"initial",marginLeft:"30px"}}>
                                                        <li
                                                        style={passwordLevel1?{color:"green"}:{color:"red"}} 
                                                        >Password must be atleast 8-letters long</li>
                                                        <li style={passwordLevel2?{color:"green"}:{color:"red"}}>Password must Contain Special Character e.g @&$</li>
                                                        <li style={passwordLevel3?{color:"green"}:{color:"red"}}>Password must Contain Digit</li>
                                                </ul>
                                        </div>
                                        

                                        <button type="submit" class="btn bg-emerald-400 text-gray-800 bg-col hover:bg-emerald-200" onClick={handleSignup}>
                                                Submit
                                        </button>
                                </form>
                        </div>
                </div>
        );
}

export default Signup;
export { languages };