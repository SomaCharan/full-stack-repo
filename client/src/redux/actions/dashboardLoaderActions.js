import $ from 'jquery';

/**
 * function to set global loader
 */
export default function setGlobalLoader(state) {
  const globalLoader = $('#root-app-spinner');

  if (state === true) {
    globalLoader.addClass('show-class');
  } else {
    globalLoader.removeClass('show-class');
  }
}
