
const now = new Date(); // Get the current time

chrome.contextMenus.create({
  id: `contextMenuLookup2`,
  title: "LOOKUP",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('clicked herrr', tab, info);
  // await generateAnswer(info.selectionText).then(async (res)=> {
  //   console.log("GOT THIS-->",res);
  //   // const selectedText = info.selectionText;

  //   chrome.tabs.sendMessage(tab.id, tab.id+"_"+res);
  //   console.log("Sent message");
  // });
  chrome.tabs.sendMessage(tab.id, tab.id+"_Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi");

  // if (info.menuItemId === "contextMenuLookup") {
  //   const selectedText = info.selectionText;
  //   console.log("Selected text:", selectedText);

  //   // Do something with the selected text, like open a new tab or display a popup
  //   chrome.tabs.create({url: "https://en.wikipedia.org/wiki/LeBron_James"});
  // }
});

async function generateAnswer(highlighted_text) {
  console.log('generating...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `Explain in 2 sentences. ${highlighted_text}`}],
      temperature: 0.8,
    })
  });
  const data = await response.json();
  console.log('response:', data.choices[0].message.content);
  const api_response = data.choices[0].message.content;
  return api_response;
}
