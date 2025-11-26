const chatBody=document.querySelector(".chat-body");
const messageInput=document.querySelector(".message-input");
const sendMessageButton=document.querySelector("#send");
const API_KEY=  "";
const fileInput=document.querySelector("#file-input");
const fileUploadWrap=document.querySelector(".file-upload-wrap");
const fileCancel=document.querySelector("#cancel-file");
const API_URL=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const chatbotToggler=document.querySelector("#chatbot-toggler");

const userData={
    message:null,
    file:{
        data:null,
        mime_type:null
    }
}


const allowedKeywords =[
    "health", "wellness", "fitness", "exercise", "diet", "nutrition", "hydration", "sleep", "rest", "hygiene",
    "immunity", "recovery", "medicine", "healthcare", "preventive care", "chronic illness", "acute illness", "lifestyle",
    "rehabilitation", "public health", "physical activity", "healthy habits", "screening", "vaccination", "disease prevention",
    "first aid", "primary care", "emergency care", "surgery", "nursing", "pharmacy", "telemedicine", "digital health",
    "mental health", "emotional health", "psychological wellbeing", "stress management", "anxiety", "panic attacks",
    "generalized anxiety disorder", "social anxiety", "phobias", "depression", "major depressive disorder",
    "persistent depressive disorder", "seasonal affective disorder", "postpartum depression", "trauma",
    "post-traumatic stress disorder", "complex ptsd", "ocd", "bipolar disorder", "schizophrenia", "schizoaffective disorder",
    "adhd", "add", "autism", "asperger syndrome", "eating disorders", "anorexia", "bulimia", "binge eating disorder",
    "body dysmorphia", "self-esteem", "self-worth", "resilience", "burnout", "work stress", "academic stress",
    "coping strategies", "mindfulness", "meditation", "yoga", "deep breathing", "progressive muscle relaxation", "therapy",
    "counseling", "support groups", "peer support", "suicide prevention", "suicide hotline", "crisis intervention",
    "mental crisis", "emotional crisis", "grief", "loss", "bereavement", "mourning", "psychology", "cognitive psychology",
    "behavioral psychology", "clinical psychology", "developmental psychology", "social psychology", "positive psychology",
    "experimental psychology", "neuropsychology", "forensic psychology", "industrial-organizational psychology",
    "sports psychology", "educational psychology", "health psychology", "child psychology", "adolescent psychology",
    "geriatric psychology", "personality psychology", "humanistic psychology", "counseling psychology", "personality",
    "traits", "temperament", "emotions", "feelings", "motivation", "perception", "sensation", "memory", "short-term memory",
    "long-term memory", "working memory", "learning", "conditioning", "classical conditioning", "operant conditioning",
    "reinforcement", "punishment", "intelligence", "iq", "eq", "human behavior", "habits", "decision making",
    "problem solving", "critical thinking", "unconscious mind", "conscious mind", "subconscious", "psychoanalysis", "freud",
    "jung", "neuroscience", "brain", "neurons", "neuroplasticity", "dopamine", "serotonin", "cortisol", "endorphins",
    "mental processes", "cognition", "attention", "focus", "executive function", "research methods", "experiments",
    "case studies", "observations", "surveys", "psychological assessment", "iq tests", "personality tests",
    "projective tests", "aptitude tests", "psychometrics", "psychotherapy", "cognitive behavioral therapy",
    "dialectical behavior therapy", "acceptance and commitment therapy", "schema therapy", "solution-focused therapy",
    "group therapy", "family therapy", "child therapy", "play therapy", "art therapy", "music therapy", "drama therapy",
    "animal-assisted therapy", "exposure therapy", "relaxation techniques", "breathing exercises", "journaling",
    "gratitude journaling", "life coaching", "career counseling", "relationship counseling", "support network", "friends",
    "family", "community", "psychiatry", "psychiatric medication", "antidepressants", "ssri", "snri", "benzodiazepines",
    "antipsychotics", "mood stabilizers", "stimulants", "mental health treatment", "treatment plan", "diagnosis",
    "screening tools", "mental health apps", "community support", "healthcare access", "stigma reduction",
    "anti-stigma campaigns", "social support", "mental health awareness", "mental health day", "education",
    "health education", "mental health literacy", "advocacy", "policy", "mental health policy", "work-life balance",
    "school counseling", "student wellbeing", "exam stress", "workplace mental health", "employee assistance program",
    "healthy relationships", "toxic relationships", "relationship boundaries", "domestic violence", "abuse",
    "addiction support", "substance abuse", "alcohol addiction", "drug addiction", "gaming addiction", "internet addiction",
    "mind-body connection", "emotional intelligence", "self-care", "self-help", "coping mechanisms", "grounding techniques",
    "stress relief", "relaxation", "wellbeing", "personal growth", "resilience building", "positive thinking", "gratitude",
    "hope", "optimism", "mental clarity", "concentration", "focus training", "self-reflection", "values", "beliefs",
    "identity", "purpose", "meaning in life", "spiritual health", "mindset", "growth mindset", "fixed mindset",
    "mental blocks", "mental fatigue", "compassion", "empathy", "kindness", "forgiveness", "altruism", "social skills",
    "communication skills", "active listening", "conflict resolution", "anger management", "time management", "goal setting",
    "habit formation", "behavior change", "motivation theories", "self-determination", "intrinsic motivation",
    "extrinsic motivation", "human needs", "maslow hierarchy", "safety needs", "love and belonging", "esteem needs",
    "self-actualization", "mind wandering", "daydreaming", "creativity", "innovation", "problem solving skills",
    "decision fatigue", "bias", "cognitive bias", "confirmation bias", "anchoring", "availability heuristic", "heuristics",
    "memory bias", "false memories", "attention span", "multitasking", "focus loss", "mental overload",
    "information processing", "neurodevelopmental disorders", "intellectual disability", "learning disabilities",
    "dyslexia", "dyscalculia", "dyspraxia", "communication disorders", "speech disorders", "language disorders",
    "neurocognitive disorders", "dementia", "alzheimer's disease", "parkinson's disease", "delirium", "sleep disorders",
    "insomnia", "sleep apnea", "narcolepsy", "parasomnias", "dreams", "nightmares", "sleep hygiene", "circadian rhythm",
    "jet lag", "shift work disorder", "sexual health", "reproductive health", "contraception", "fertility", "pregnancy",
    "maternal health", "childbirth", "postnatal care", "menopause", "andropause", "chronic pain", "pain management",
    "fibromyalgia", "arthritis", "back pain", "migraines", "cancer", "diabetes", "cardiovascular disease", "hypertension",
    "stroke", "respiratory health", "asthma", "copd", "lung health", "skin health", "dermatology", "immunology",
    "infectious diseases", "covid-19", "flu", "hiv", "aids", "tuberculosis", "hepatitis", "vaccines", "epidemiology",
    "health promotion", "occupational health", "environmental health", "climate change and health", "air pollution",
    "water sanitation", "food safety", "global health", "world health organization", "health inequality", "health equity",
    "universal healthcare", "health economics", "telehealth", "mobile health", "digital therapy", "mental health chatbot"
  ];



// ✅ Function to check if input is related
const isMentalHealthQuery = (message) => {
  const lowerMsg = message.toLowerCase();
  return allowedKeywords.some(keyword => lowerMsg.includes(keyword));
};

const chatHistory=[];


const  createMessageElement=(content,...classes)=>{
    const div = document.createElement("div");
    div.classList.add("message",...classes);
    div.innerHTML=content;
    return div;
}

const generateBotResponse=async(incomingMessageDiv)=>{
    const messageElement=incomingMessageDiv.querySelector(".message-text");
    chatHistory.push( {
        role:"user",
        parts: [
          {
             text: userData.message}, ...(userData.file.data ?[{inline_data:userData.file}]:[])]
          });
    const requestOptions={
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    try{
        const response=await fetch(API_URL,requestOptions);
        const data =await response.json();
        if(!response.ok) throw new Error(data.error.message);
       const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
       messageElement.innerText=apiResponseText;
           chatHistory.push( {
        role:"model",
        parts: [
          {
             text: apiResponseText}]
          });
    }catch(error){
        console.log(error);
         messageElement.innerText=error.message;
         messageElement.style.color="#ff0000";
    } finally{
        userData.file={};
        incomingMessageDiv.classList.remove("thinking");
         chatBody.scrollTo({  top: chatBody.scrollHeight, behavior:"smooth"});
    }
}


const handleOutgoingMessage=(e)=>{
    e.preventDefault();
    userData.message=messageInput.value.trim();
    messageInput.value="";
    fileUploadWrap.classList.remove("file-uploaded");
    const messageContent=`<div class="message-text">${userData.message}</div>
    ${userData.file.data ? `<img src ="data:${userData.file.mime_type};base64,${userData.file.data}"class="attachment"/>`:""}`;
    const outgoingMessageDiv=createMessageElement(messageContent,"user-message");
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({  top: chatBody.scrollHeight, behavior:"smooth"});

    setTimeout(()=>{
         const messageContent=`   <svg class="photo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
</svg>
                <div class="message-text">
                    <div class="thinking">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>

                </div>`;
    const incomingMessageDiv=createMessageElement(messageContent,"bot-message","thinking");
    chatBody.appendChild(incomingMessageDiv);
     chatBody.scrollTo({  top: chatBody.scrollHeight, behavior:"smooth"});
    // ✅ Restrict to mental health queries only
if (isMentalHealthQuery(userData.message)) {
    generateBotResponse(incomingMessageDiv);  // send to API
} else {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    messageElement.innerText = "❌ I can only answer questions related to mental health and psychology.";
    incomingMessageDiv.classList.remove("thinking");
}
        
    },600);
}
messageInput.addEventListener("keydown",(e)=>{
    const userMessage=e.target.value.trim();
    if(e.key=="Enter"&&userMessage){
        handleOutgoingMessage(e);
    }
});

 const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect:(emoji)=>{
        const{selectionStart:start,selectionEnd:end}=messageInput;
        messageInput.setRangeText(emoji.native,start,end,"end");
        messageInput.focus();
    },
    onClickOutside:(e)=>{
        if(e.target.id ==="emoji-picker"){
            document.body.classList.toggle("show-emoji-picker");
        }else{
            document.body.classList.remove("show-emoji-picker");
        }
    }
 });

document.querySelector(".chat-form").appendChild(picker);

fileInput.addEventListener("change",()=>{
    const file=fileInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload=(e)=>{
        fileUploadWrap.querySelector("img").src=e.target.result;
        fileUploadWrap.classList.add("file-uploaded");
        const base64String=e.target.result.split(",")[1];
        userData.file={
            data:base64String,
            mime_type:file.type
        }
        fileInput.value="";
    }
    reader.readAsDataURL(file);
});

fileCancel.addEventListener("click",()=>{
    userData.file={};
    fileUploadWrap.classList.remove("file-uploaded"); 
});
document.querySelector("#file-upload").addEventListener("click",()=>fileInput.click())

 sendMessageButton.addEventListener("click",(e)=>handleOutgoingMessage(e))

 chatbotToggler.addEventListener("click",()=>document.body.classList.toggle("show-chatbot"));
