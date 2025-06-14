async function loadPosts() {
  const container = document.getElementById("posts-container");

  const posts = [
    "noticia-1.md"
    // Adicione mais arquivos aqui, ex: "noticia-2.md"
  ];

  for (const postUrl of posts) {
    try {
      const res = await fetch(postUrl);
      const text = await res.text();
      const html = markdownToHtml(text);
      const article = document.createElement("article");
      article.innerHTML = html;
      container.appendChild(article);
    } catch (e) {
      console.error("Erro ao carregar post:", postUrl, e);
    }
  }
}

function markdownToHtml(md) {
  return md
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/^## (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, `
      <div style="margin: 1rem 0; text-align: center;">
        <img src="$2" alt="$1" style="max-width:100%; border-radius:10px; box-shadow: 0 0 10px #7f39fb;">
      </div>`)
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n{2,}/g, '<br><br>');
}

window.addEventListener("DOMContentLoaded", loadPosts);
</script>
