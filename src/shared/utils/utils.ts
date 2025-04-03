// Função para gerar um código curto aleatório sem depender de bibliotecas externas
// Poderia utilizar alguma lib que já faz isso, mas queria manter o código mais limpo possível
export function generateShortCode(length = 6): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}
