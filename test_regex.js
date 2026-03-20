const txt = `  de: {
    appTitle: "Prompt Studio",
    learning: "🎓 KI Academy",
    credits: "⚡ Sparks & Credits",
  },
  en: {
    appTitle: "Prompt Studio",
  }`;
console.log(txt.replace(/en:\s*\{/, 'MATCH'));
