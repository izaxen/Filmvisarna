
import Header from './Components/header.js';
import Body from './Components/body.js';
import Footer from './Components/footer.js';
import Handler from './handler.js';

export default class App {

  constructor() {

    new Footer().render();
    new Body().render();
    new Header().render();

    this.handler = new Handler('main');
  }
}