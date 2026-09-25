'use strict';

// O manual só copia texto. Não executa comandos nem consulta aplicações locais.
document.querySelectorAll('[data-command]').forEach((block, index) => {
  const code = block.querySelector('code');
  if (!code) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.textContent = 'Copiar';
  button.setAttribute('aria-label', `Copiar comando ${index + 1}: ${code.textContent.trim()}`);
  const feedback = document.createElement('p');
  feedback.className = 'copy-feedback';
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  feedback.setAttribute('aria-atomic', 'true');
  block.append(button, feedback);

  button.addEventListener('click', async () => {
    feedback.textContent = '';
    button.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code.textContent.trim());
      feedback.textContent = 'Comando copiado. Cole-o no PowerShell indicado e prima Enter para o executar.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'A cópia automática não foi permitida. O comando está selecionado: prima Ctrl+C para copiar.';
    } finally {
      button.disabled = false;
      button.focus({ preventScroll: true });
    }
  });
});
