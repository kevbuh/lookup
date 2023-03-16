import { API_KEY } from './constants.js';

const now = new Date(); // Get the current time

chrome.contextMenus.create({
  id: `contextMenuLookup_${now}`,
  title: "LOOKUP",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "contextMenuLookup") {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);
    // Do something with the selected text, like open a new tab or display a popup
    chrome.tabs.create({url: "https://en.wikipedia.org/wiki/LeBron_James"});
  }
});

chrome.contextMenus.onClicked.addListener(async function(message) {
  await generateAnswer().then(function(response) {
    // sendResponse([response, null]);
    console.log('generated answer!')
  }).catch(function(error) {
    // sendResponse([null, error]);
    console.log('ERROR IN GENERATION')
  });
  return true;
});

async function generateAnswer() {
  console.log('clicked')
  let result = '';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "Hello!"}],
      temperature: 0.7,
    })
  });
  console.log('reading...');
  const data = await response.json();
  // console.log('Response data:', data);
  console.log('response:', data.choices[0].message.content);


  
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

  console.log('end of generation function!')
  
  return {};
}






