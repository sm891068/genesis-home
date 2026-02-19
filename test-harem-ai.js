import HaremAILibrary, { 
  getCharacterById,
  getAllHaremCharacters,
  getCharactersByRarity,
  getAffectionStage,
  getRandomDialogue,
  getGiftReaction
} from './static/data/harem-ai-library.js';

console.log('🧪 測試後宮AI角色庫...\n');

// 測試1: 獲取所有角色
console.log('=== 測試1: 獲取所有角色 ===');
const allCharacters = getAllHaremCharacters();
console.log(`✓ 總共 ${allCharacters.length} 位角色`);

// 列出所有角色
allCharacters.forEach(char => {
  console.log(`  - ${char.name} (${char.id}) [${char.rarity}]`);
});

// 測試2: 按稀有度分類
console.log('\n=== 測試2: 按稀有度分類 ===');
['LR', 'UR', 'SSR', 'SR', 'R'].forEach(rarity => {
  const chars = getCharactersByRarity(rarity);
  console.log(`${rarity}: ${chars.length} 位 - ${chars.map(c => c.name).join(', ')}`);
});

// 測試3: 獲取特定角色
console.log('\n=== 測試3: 獲取琉璃女王數據 ===');
const queen = getCharacterById('lr_002');
console.log(`✓ 名稱: ${queen.name}`);
console.log(`✓ 稀有度: ${queen.rarity}`);
console.log(`✓ 職業: ${queen.occupation}`);
console.log(`✓ 性格: ${queen.personality.traits.join(', ')}`);
console.log(`✓ 性格類型: ${queen.personality.archetype}`);

// 測試4: 情感階段
console.log('\n=== 測試4: 測試情感階段 ===');
[0, 40, 80, 120, 160, 200].forEach(points => {
  const stage = getAffectionStage('lr_002', points);
  console.log(`${points}分 -> ${stage.title} (${stage.attitude})`);
});

// 測試5: 隨機對話
console.log('\n=== 測試5: 測試隨機對話 (親密度120) ===');
for (let i = 0; i < 3; i++) {
  const dialogue = getRandomDialogue('lr_002', 120);
  console.log(`  ${i + 1}. ${dialogue}`);
}

// 測試6: 禮物反應
console.log('\n=== 測試6: 測試禮物反應 ===');
const gifts = ['稀世珍寶', '高級茶葉', '普通禮物', '廉價飾品'];
gifts.forEach(gift => {
  const reaction = getGiftReaction('lr_002', gift);
  console.log(`${gift} -> ${reaction}`);
});

// 測試7: 傲嬌角色特殊測試
console.log('\n=== 測試7: 傲嬌角色 - 羅奈米 ===');
const tsundere = getCharacterById('ssr_006');
console.log(`✓ 名稱: ${tsundere.name} (${tsundere.nickname})`);
console.log(`✓ 年齡: ${tsundere.appearance.age}歲`);
console.log(`✓ 性格類型: ${tsundere.personality.archetype}`);
[0, 80, 160, 200].forEach(points => {
  const stage = getAffectionStage('ssr_006', points);
  console.log(`${points}分: ${stage.tsundereLevel} - ${stage.dialogues[0]}`);
});

// 統計信息
console.log('\n=== 統計信息 ===');
console.log(`✓ LR級: ${getCharactersByRarity('LR').length} 位`);
console.log(`✓ UR級: ${getCharactersByRarity('UR').length} 位`);
console.log(`✓ SSR級: ${getCharactersByRarity('SSR').length} 位`);
console.log(`✓ SR級: ${getCharactersByRarity('SR').length} 位`);
console.log(`✓ R級: ${getCharactersByRarity('R').length} 位`);
console.log(`✓ 總計: ${allCharacters.length} 位`);

console.log('\n✅ 所有測試完成！');
