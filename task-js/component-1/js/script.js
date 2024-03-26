(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */

  const titles = document.querySelectorAll('.accordeon-item-title');
  const tabs = document.querySelectorAll('.accordeon-item');

  const openedTabs = [];
  
  for (const title of titles) {
    title.addEventListener('click', () => {
      for (const tab of tabs) {
        if (settings.tabsLimit === 0) {
          if (tab.children[0] === title) {
            if (tab.classList.contains('accordeon-item--open')) {
              tab.classList.remove('accordeon-item--open');
            } else {
              tab.classList.add('accordeon-item--open');
            }
          }
        } else {
          if (tab.children[0] === title) {
            if (openedTabs.includes(tab)) {
              if (tab.classList.contains('accordeon-item--open')) {
                tab.classList.remove('accordeon-item--open');
              } else {
                tab.classList.add('accordeon-item--open');
              }
            } else {
              if (openedTabs.length === settings.tabsLimit) {
                openedTabs[0].classList.remove('accordeon-item--open');
                openedTabs.shift();
                openedTabs.push(tab);
                tab.classList.add('accordeon-item--open');
              } else {
                tab.classList.add('accordeon-item--open');
                openedTabs.push(tab);
              }
            }
          }
        }
      }
    })
  }

})();

