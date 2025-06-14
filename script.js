async function loadPosts() {
  const container = document.getElementById("posts-container");
  const links = [
    "https://g1.globo.com", // Substitua por URLs reais de notícias
    "https://www.cnnbrasil.com.br/"
  ];

  for (const url of links) {
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      const html = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title = doc.querySelector("h1")?.innerText || "Notícia sem título";
      const paragraphs = [...doc.querySelectorAll("p")].slice(0, 3).map(p => `<p>${p.innerText}</p>`).join("");
      const image = doc.querySelector("img")?.src || "";

      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${title}</h2>
        ${image ? `<img src="${image}" style="max-width:100%;border-radius:12px;">` : ""}
        ${paragraphs}
      `;
      container.appendChild(article);
    } catch (e) {
      console.error("Erro ao carregar:", url, e);
    }
  }
}

window.addEventListener("DOMContentLoaded", loadPosts);
