import Stats from '../../../../node_modules/stats.js/src/Stats.js';

/**
 * 加载 stats.js
 *
 * @returns {Stats} stats
 */
function initStatsJS(): Stats {
  const stats = new Stats();

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  return stats;
}

export { initStatsJS };
