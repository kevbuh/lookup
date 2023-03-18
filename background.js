
const now = new Date(); // Get the current time

chrome.contextMenus.create({
  id: `contextMenuLookup2_${now}`,
  title: "LOOKUP",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('clicked herrr');
  // chrome.tabs.sendMessage(tab.id, { action: "append-text", text: info.text });
  await generateAnswer(info.selectionText).then(async (res)=> {
    console.log("GOT THIS-->",res);
    // const selectedText = info.selectionText;
    // console.log(tab);

    // console.log("Selected text:", selectedText);
    chrome.tabs.sendMessage(tab.id, res);
    console.log("Sent message");
  });
  

  // chrome.scripting.executeScript({
  //   files: ['content-script.js'],
  //   target: {tabId: tab.id}
  // });

  if (info.menuItemId === "contextMenuLookup") {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);
    // Do something with the selected text, like open a new tab or display a popup
    chrome.tabs.create({url: "https://en.wikipedia.org/wiki/LeBron_James"});
  }
});

async function generateAnswer(highlighted_text) {
  console.log('clicked')
  let result = '';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `Explain in one sentence, ${highlighted_text}`}],
      temperature: 0.7,
    })
  });
  console.log('reading...');
  const data = await response.json();
  // console.log('Response data:', data);
  console.log('response:', data.choices[0].message.content);
  const api_response = data.choices[0].message.content;
  return api_response;
}

// try{
//   console.log('start');
//   chrome.action.onClicked.addListener(function (tab) {
//       chrome.scripting.executeScript({
//         files: ['content-script.js'],
//         target: {tabId: tab.id}
//       });
//   });
// }catch(e){
//   console.log(e);
// }



// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.action === "append-text") {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { text: message.text });
//     });
//   }
// });


// MAYBE USE THIS TO DOM STUFF --> sendResponse([response, null]);
// chrome.contextMenus.onClicked.addListener(async function(message) {
//   const res1 = await generateAnswer().then(function(response) {
//     console.log('generated answer!')
//   }).catch(function(error) {
//     console.log('ERROR IN GENERATION')
//   });

//   const data = await res1;
//   console.log('GOT THIS:::::', data)
//   // const element = document.getElementById("selected-text"); // Get the element by ID
//   // element.textContent += data; // Append text to the element's content

//   return true;
// });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   await generateAnswer().then(async (res)=> {
//     console.log("GOT THIS-->",res.api_response);
//     // document.getElementById("look-up-clicked").textContent += res;
//     // chrome.tabs.sendMessage(tab.id, { action: "append-text", text: res.api_response });
//     // inject content script and send message
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     console.log('before message call');
//     const response = await chrome.runtime.sendMessage(tab.id, { data: res.api_response }).then((res) =>{console.log('yuh', res);})
//     console.log('ENDD::::');
//   });
// });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   await generateAnswer().then(async (res) => {
//   console.log('GOT THIS-->', res.api_response);
 
//   // Send the message to the content script
//   chrome.tabs.sendMessage(tab.id, { action: 'append-text', text: res.api_response });
//   });
//  });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  // await generateAnswer().then(async (res) => {
  //   console.log('GOT THIS-->', res.api_response);
  
  
  //   // Send the message to the content script
  //   // chrome.runtime.sendMessage({"url": "bob"});
  
  // });
  // const tab2 = await chrome.tabs.query({ active: true, currentWindow: true });
  // chrome.tabs.sendMessage(tab2[0].id, '"hello kev"');
  // chrome.tabs.sendMessage(tabs[0].id,"your message");
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  //   chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"});  
  //   }); 
  // chrome.tabs.sendMessage(tab.id,"your message")

//  });

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   // await generateAnswer().then(async (res) => {
//   // console.log("GOT THIS-->", res.api_response);
 
//   // Inject content script and send message
//   const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
 
//   // Send a message to the content script
//   // chrome.tabs.sendMessage(currentTab.id, { action: "append-text", text: res.api_response });
//   chrome.tabs.sendMessage(currentTab.id, { action: "append-text", text: "bob" });

//   // });
//  });



  
  // const reader = response.body.getReader();
  // console.log(reader);
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) break;
  //   const message = new TextDecoder("utf-8").decode(value);
  //   console.debug('sse message', message);
  //   if (message === '[DONE]') {
  //     // params.onEvent({ type: 'done' });
  //     break;
  //   }
  //   let data;
  //   try {
  //     data = JSON.parse(message);
  //     const text = data.choices[0].text;
  //     if (text === '' || text === '') {
  //       continue;
  //     }
  //     result += text;
  //     // params.onEvent({
  //     //   type: 'answer',
  //     //   data: {
  //     //     text: result,
  //     //     messageId: data.id,
  //     //     conversationId: data.id,
  //     //   },
  //     // });
  //   } catch (err) {
  //     console.error(err);
  //     continue;
  //   }
  // }

  // console.log('end of generation function!')
  
  // return {"api_response":api_response};
// }






