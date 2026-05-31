export type QuestCategory = 'individual' | 'grupo' | 'familia' | 'casal';

export interface Quest {
  id: string;
  text: string;
  category: QuestCategory;
}

export const ALL_QUESTS: Quest[] = [
  // Individual
  { id: 'i1', category: 'individual', text: 'Encontre exatamente 42 objetos amarelos durante uma caminhada. Tire uma foto do objeto número 42. Ao final, escreva qual pergunta da sua vida merece essa resposta.' },
  { id: 'i2', category: 'individual', text: 'Passe 15 minutos tentando interpretar o mundo como se você fosse um alienígena recém-chegado à Terra. Narre mentalmente tudo o que vê.' },
  { id: 'i3', category: 'individual', text: 'Escolha um pombo aleatório. Siga-o por 5 minutos. Crie uma teoria conspiratória sobre esse pombo.' },
  { id: 'i4', category: 'individual', text: 'Entre em uma loja ou prédio que nunca visitou. Dê uma volta completa.' },
  { id: 'i5', category: 'individual', text: 'Escolha um objeto da sua casa. Faça 5 perguntas a ele como se ele pudesse responder.' },

  // Grupo de amigos
  { id: 'g1', category: 'grupo', text: 'Reúnam-se por 10 minutos. O tema: "A Terra será demolida amanhã para a construção de uma via expressa espacial." Cada pessoa deve defender uma solução absurda.' },
  { id: 'g2', category: 'grupo', text: 'Cada participante deve encontrar algo que possa servir de "tradutor universal". Vence a explicação mais ridícula e convincente.' },
  { id: 'g3', category: 'grupo', text: 'Olimpíadas dos Talentos Inúteis: melhor imitação de impressora, melhor caminhada de dinossauro burocrata, melhor discurso de candidato a prefeito dos esquilos.' },
  { id: 'g4', category: 'grupo', text: 'Escondam uma batata. Criem uma história épica sobre sua importância para a civilização. A equipe deve recuperá-la.' },

  // Família
  { id: 'f1', category: 'familia', text: 'Alguém anuncia uma emergência absurda e a família deve criar um plano diplomático. Ex: "As bananas declararam independência!"' },
  { id: 'f2', category: 'familia', text: 'Cada pessoa escolhe um objeto comum e deve convencer os demais de que ele salvou a humanidade.' },

  // Casal
  { id: 'c1', category: 'casal', text: 'Finjam que são espécies alienígenas diferentes. Cada um deve explicar seus costumes românticos estranhos.' },
  { id: 'c2', category: 'casal', text: 'Façam um mini piquenique usando apenas a toalha considerada como um artefato sagrado.' },
  { id: 'c3', category: 'casal', text: 'Escolha alguma comida polêmica e façam uma defesa jurídica épica perante o Tribunal Galáctico. "Pizza de brócolis".' },
  { id: 'c4', category: 'casal', text: 'Caminhem sem destino por 20 minutos. O primeiro local estranho encontrado recebe um nome oficial. "Aqui fica a República Independente do Café Perdido."' },
];

export function pickRandom(n: number): Quest[] {
  const a = [...ALL_QUESTS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}
