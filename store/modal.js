/**
 * Состояние модального окна
 *
 * @typedef ModalState
 * @type {object}
 * @property {boolean} isModalVisible - флаг активности модального окна
 */

/**
 * @returns {ModalState} - state
 */
export const state = () => ({
  isModalVisible: false
});

export const mutations = {
  /**
   * Открывает модальное окно
   *
   * @param {ModalState} state - state
   */
  showModal(state) {
    state.isModalVisible = true;
  },
  /**
   * Закрывает модальное окно
   *
   * @param {ModalState} state - state
   */
  hideModal(state) {
    state.isModalVisible = false;
  }
};
