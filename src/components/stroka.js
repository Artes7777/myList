import React, {Component} from 'react';
let myNews = [ { author: "Oxxxymyron" , song: "Bipolyaro4ka" },
                { author: "Johnyboy" , song: "Какая-то дичь" },
                { author: "Dizaster" , song: "Fuck" }];
let allNews = [
];
class Strokab extends Component {
  render () {
    const data = this.props.data;
    return (
      <div>
              { (data.length > 0) ?
                data.map ( function (newer) {
                  return (<div> <p>{newer.author}</p>
                              <p>{newer.song}</p>
                          </div> )
                }) : "Новостей нет, пидор"
               }

    </div>)
  }
}
class News extends Component {
render () {
 return (<div>Ты пидор.</div> )
}
}


class Stroka extends Component {
  render () { return (<div>Свежие новости
                      <News />
                      <Strokab data = {allNews}/>
                      </div>)
}
}

export default Stroka;
