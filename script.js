const apiChatKey = "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";

// Function to handle scrolling to the "IMAGE GENERATION" text
function scrollToImages() {
    const imagesText = document.getElementById('title-text2');
    const scrollOptions = {
        top: imagesText.offsetTop,
        behavior: 'smooth'
    };
    window.scrollTo(scrollOptions);
}

// Add a click event listener to the "IMAGE GENERATION" button
const navImageBtn = document.getElementById('nav-image');
navImageBtn.addEventListener('click', scrollToImages);

const API_KEY = "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"; // Replace with your actual API key
const API_ENDPOINT_GENERATE = 'https://api.openai.com/v1/images/generations';

const submitButton = document.getElementById("submitbut-image");
const form = document.getElementById("imageinput");
const input = document.getElementById("image");
var image = document.getElementById("img_generated");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener("submit", handleForm);


const getImage = async () => {
    console.log(input.value);

    if (input.value === "") {
        return;
    }
    else{


        image.innerHTML = "";
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",  
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + API_KEY,
                },
                body: JSON.stringify({
                    prompt:`Create an amazing image using this description: ${input.value}`,
                    n: 1,
                    size: "1024x1024",
                }),
            } 
        );
        const result = await response.json();
        console.log(result);

        const imageUrl = result.data[0].url; // Assuming "result" is the API response
        image.src = imageUrl; // Set the "src" attribute of the <img> element



    }

        
};

submitButton.addEventListener("click", getImage);






const chatForm = document.getElementById('chatinput');
const userInput = document.getElementById("message");
const sendButton = document.getElementById("submitbut-chat");
const chatContainer = document.getElementById('chat-container'); 



const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// Function to get AI-generated response

var message_list = [{
    role: "system",
    content: "You are a helpful assistant."
  }];


const getAIResponse = async (inputMessage) => {
    console.log("input message:"+ inputMessage); 
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: message_list,
        }),
    });
    const result = await response.json();
    console.log(result);
    console.log(result.choices[0].message);
    console.log(result.choices[0].message.content);
    return result.choices[0].message.content;
};






function handleForm(event) {
    event.preventDefault();
}
function chatFunc() {
    console.log(userInput.value);
    const message = "YOU: " + userInput.value.trim();

    if (message !== "") {
        // Create a new chat message element and append it to the chat container
        const messageElement = document.createElement("div");

        messageElement.style.color = "white";
        messageElement.classList.add("chat-message");
        messageElement.textContent = message;

        chatContainer.appendChild(messageElement);

        // Clear the input field after sending the message

        // Scroll the chat container to the bottom to show the latest messages
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Get AI-generated response and display it in the chat container
        message_list.push({role: "user",content: userInput.value });
        getAIResponse(userInput.value).then((aiResponse) => {
            const aiMessageElement = document.createElement("div");
            aiMessageElement.style.color = "white";
            aiMessageElement.classList.add("chat-message");
            aiMessageElement.textContent = "AI: " + aiResponse;
            chatContainer.appendChild(aiMessageElement);
            message_list.push({role: "system", content: aiResponse});


            // Scroll the chat container to the bottom to show the latest messages
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }
    userInput.value = "";

}


// 



chatForm.addEventListener("submit", handleForm);
sendButton.addEventListener("click", chatFunc);

// Add a keyup event listener to the input field to handle the "Enter" key
userInput.addEventListener("keyup", function(event) {
   
        event.preventDefault();
        // Call the chatFunc to handle the message

    
}); 

function clearChat() {
    chatContainer.innerHTML = "";
    message_list = [{
        role: "system",
        content: "You are a helpful assistant."
      }];
    
}
const clearbut = document.getElementById("clearbutton");

clearbut.addEventListener("click", clearChat);