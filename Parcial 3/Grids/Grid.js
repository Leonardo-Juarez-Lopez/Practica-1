import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

function helloWorld () {
  const wrapperRef = useRef(null);

  const grid = new Grid({
    search: true,
    columns: ['Title', 'Director', 'Producer'],
    server: {
      url: 'https://swapi.dev/api/films/',
      then: data => data.results.map(movie => [movie.title, movie.director, movie.producer])
    } 
  });
  
  useEffect(() => {
    grid.render(wrapperRef.current);
  });
  
  return <div ref={wrapperRef} />;
}

new Grid({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com',   '(01) 22 888 4444']
    ]
  }).updateConfig({
    // lets update the columns field only
    columns: ['First Name', 'Email', 'Phone']
  });