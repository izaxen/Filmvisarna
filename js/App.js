
import Header from './Components/header.js';
import FrontPage from "./pages/pages/frontpage.js";
import Footer from './Components/footer.js';
import Handler from './handler.js';

export default class App {

  constructor() {

    new Footer().render();
    new FrontPage().getMovies();
    new Header().render();

    this.handler = new Handler('main');
  }
}