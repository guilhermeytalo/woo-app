/**
 * RecipeDebugger — Hackathon Absurd Restriction Compliance Module
 *
 * Per the official restriction received from the cosmos:
 *   "O projeto deve ter um modo de debug que imprime os dados em formato de receita culinária."
 *
 * As the Hitchhiker's Guide notes: "There is no escape. Boa sorte."
 * This module is, therefore, entirely canon.
 */

import { type AdventureLog } from '@/store/slices/AdventureLogSlice';
import { type QuestCategory } from '@/utils/quests';

const CATEGORY_CUISINE: Record<QuestCategory, string> = {
  individual: 'Solo Gourmet — para um único aventureiro faminto de absurdo',
  grupo:      'Banquete Coletivo — serve até 8 pessoas sem senso de vergonha',
  familia:    'Culinária Familiar — receita passada de geração em geração, mesmo que ninguém lembre por quê',
  casal:      'Jantar a Dois — melhor consumido com olhares cúmplices',
};

const RATING_GARNISH: Record<number, string> = {
  1: 'Sirva frio. Muito frio.',
  2: 'Adicione uma pitada de esperança antes de servir.',
  3: 'Resultado satisfatório. Nem o Marvin reclamaria (muito).',
  4: 'Prato aprovado pelo Restaurante no Fim do Universo.',
  5: 'A resposta para esta receita é 42. E também estava deliciosa.',
};

function starsToIngredient(rating: number): string {
  return '⭐'.repeat(rating) || '☆☆☆☆☆';
}

function formatRecipeDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Formats a single AdventureLog as a culinary recipe and logs it to the console.
 * Only call this in __DEV__ contexts. Production kitchens are closed.
 */
export function debugAsRecipe(log: AdventureLog): void {
  if (!__DEV__) return;

  const cuisine = CATEGORY_CUISINE[log.category] ?? 'Culinária Interdimensional';
  const garnish = RATING_GARNISH[log.rating] ?? 'Sirva como preferir. O universo é indiferente.';
  const portions = wordCount(log.challengeText);

  const recipe = `
╔══════════════════════════════════════════════════════════════╗
║              🍽️  RECEITA DE AVENTURA CÓSMICA  🍽️              ║
╚══════════════════════════════════════════════════════════════╝

📖 TIPO DE COZINHA
   ${cuisine}

🗓️  DATA DE PREPARO
   ${formatRecipeDate(log.date)}

🥘 INGREDIENTES PRINCIPAIS
   - 1 desafio absurdo (${portions} palavras, medidas com precisão duvidosa)
   - ${starsToIngredient(log.rating)} de coragem (nível ${log.rating}/5)
   - 1 dose generosa de improvisação
   ${log.notes ? `- Comentários do chef (a gosto): "${log.notes}"` : '- Comentários do chef: omitidos por discrição intergaláctica'}

📋 MODO DE PREPARO
   1. Leia o desafio com seriedade imprópria para a situação:
      "${log.challengeText}"

   2. Execute. Não questione. O pombo já está te observando.

   3. Reflita sobre o resultado${log.notes ? `: "${log.notes}"` : '. (silêncio também é uma resposta válida)'}

   4. Atribua uma nota. Você atribuiu: ${starsToIngredient(log.rating)}

🍷 COMO SERVIR
   ${garnish}

📦 ARMAZENAMENTO
   Este prato está preservado em AsyncStorage, ID: ${log.id}
   Validade: até que o usuário desinstale o app ou o universo colapse
   (o que vier primeiro — provavelmente o app)

══════════════════════════════════════════════════════════════
  Receita gerada pelo RecipeDebugger™ — "Não tem como escapar."
══════════════════════════════════════════════════════════════
`.trim();

  console.log(recipe);
}

/**
 * Formats all logs as a full tasting menu and logs to console.
 */
export function debugAllAsMenu(logs: AdventureLog[]): void {
  if (!__DEV__) return;

  if (logs.length === 0) {
    console.log(`
🍽️  CARDÁPIO VAZIO
   Nenhuma aventura foi registrada ainda.
   O chef está esperando. O universo, também.
`);
    return;
  }

  console.log(`\n🌌 MENU DEGUSTAÇÃO WÖO — ${logs.length} prato${logs.length !== 1 ? 's' : ''} servido${logs.length !== 1 ? 's' : ''}\n`);
  logs.forEach((log, i) => {
    console.log(`─── Prato ${i + 1} de ${logs.length} ───`);
    debugAsRecipe(log);
    console.log('');
  });
}
