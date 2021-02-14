import React from "react";
import "./dugmad.css"
import tref from "../zaSkocka/tref.png";
import pik from "../zaSkocka/pik.png";
import karo from "../zaSkocka/karo.png";
import herc from "../zaSkocka/herc.png";
import zvijezda from "../zaSkocka/zvijezda.png";
import skocko from "../zaSkocka/skocko.png";

class Dugmad extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          kombinacija: [],
          proba: [],
          pokusaji: [[]],
          pogodjeno: []
      };
      this.click = this.click.bind(this);
      this.renderuj = this.renderuj.bind(this);
      this.renderujPogodjeno = this.renderujPogodjeno.bind(this);
      this.renderujRjesenje = this.renderujRjesenje.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        let komb = zadatiNiz();
        this.setState({
            kombinacija: komb
        })
        document.getElementById("dugmad").addEventListener("click", this.click)
    };

    click(e) {
        if ((JSON.stringify(this.state.pogodjeno[this.state.pogodjeno.length-1]) === "[true,true,true,true]") || (this.state.pogodjeno.length === 6 && this.state.pogodjeno[this.state.pogodjeno.length-1].length === 4)) {
            return;
        } else {
            let niz = this.state.proba.slice();
            let pokusaj = this.state.pokusaji.slice();
                
            if (pokusaj[pokusaj.length-1].length === 4) {
                pokusaj.push([]);
            }
                
            niz.push(e.target.name);
            pokusaj[pokusaj.length-1].push(e.target.name)
                
            this.setState({
                proba: niz,
                pokusaji: pokusaj
            });

            if (niz.length == 4) {
                let pogodio = podudarnost(this.state.kombinacija, niz);
                let pogoci = this.state.pogodjeno.slice()
                pogoci.push(pogodio);
                this.setState({
                    proba: [],
                    pogodjeno: pogoci
                })
                // console.log(this.state.pogodjeno, JSON.stringify(this.state.pogodjeno[this.state.pogodjeno.length-1]));
            }
        }
    };

    renderujPogodjeno() {
        if (this.state.pogodjeno.length > 0) {
            let pogodjeno = this.state.pogodjeno.slice();
            return pogodjeno.map(element => {
                while (element.length < 4) {
                    element.push("nema");
                }
                return element.map(el => {
                    if (el === true) {
                        return <div className="crveni"></div>
                    } else if (el === false) {
                        return <div className="zuti"></div>
                    } else if (el === "nema") {
                        return <div className="prazni"></div>
                    }
                })
            })
        }
    }

    renderujRjesenje() {
        if (this.state.kombinacija.length === 4 && this.state.pokusaji[this.state.pokusaji.length-1].length === 4) {
            let kombinacija = JSON.stringify(this.state.kombinacija.slice());
            let pokusaj = this.state.pokusaji[this.state.pokusaji.length-1];
            pokusaj = JSON.stringify(pokusaj.map(el => parseInt(el)));
            let brojPokusaja = this.state.pokusaji.length;
            if (kombinacija === pokusaj || brojPokusaja === 6) {
                let komb = this.state.kombinacija.slice();
                komb.map(el => JSON.stringify(el));
                return komb.map(el => {
                    if (el == "1") {
                        return <img name="1" className="dugme" src={tref}></img>
                    } else if (el == "2") {
                        return <img name="2" className="dugme" src={pik}></img>
                    } else if (el == "3") {
                        return <img name="3" className="dugme" src={karo}></img>
                    } else if (el == "4") {
                        return <img name="4" className="dugme" src={herc}></img>
                    } else if (el == "5") {
                        return <img name="5" className="dugme" src={zvijezda}></img>
                    } else if (el == "6") {
                        return <img name="6" className="dugme" src={skocko}></img>
                    }
                })
            }
        }
    }


    renderuj() {
        let prikazi = this.state.pokusaji.slice();
        return prikazi.map(element => {
            return element.map(el => {
                if (el == "1") {
                    return <img name="1" className="dugme" src={tref}></img>
                } else if (el == "2") {
                    return <img name="2" className="dugme" src={pik}></img>
                } else if (el == "3") {
                    return <img name="3" className="dugme" src={karo}></img>
                } else if (el == "4") {
                    return <img name="4" className="dugme" src={herc}></img>
                } else if (el == "5") {
                    return <img name="5" className="dugme" src={zvijezda}></img>
                } else if (el == "6") {
                    return <img name="6" className="dugme" src={skocko}></img>
                }
            })
        })
    };

    render() {
        return (
            <div>
                {/* <div>{this.state.kombinacija}</div> */}
                <div id="dugmad">
                    <img name="1" className="dugme" src={tref}></img>
                    <img name="2" className="dugme" src={pik}></img>
                    <img name="3" className="dugme" src={karo}></img>
                    <img name="4" className="dugme" src={herc}></img>
                    <img name="5" className="dugme" src={zvijezda}></img>
                    <img name="6" className="dugme" src={skocko}></img>
                </div>

                <div className="divZnakovaIKrugova">
                    <div className="renderujZnakove">{this.renderuj()}</div>
                    <div className="divKrugova">{this.renderujPogodjeno()}</div>
                </div>
                    <div className="rjesenje">{this.renderujRjesenje()}</div>

            </div>
        )
    }
};

function zadatiNiz() {
    return [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6), Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)];
}

const podudarnost = (niz, probaj) => {
    let vrati = [];
    let zadati = niz.slice();
    let proba = probaj.slice().map(el => parseInt(el));
    probaj.forEach((element, ind) => {
        if (element == niz[ind]) {
            vrati.push(true);
            delete proba[ind];
            delete zadati[ind];
        };
    });
    proba.filter(element => element !== undefined);
    zadati.filter(element => element !== undefined);
    if (proba.length === 0) {
        return vrati;
    } else {
        proba.forEach((element) => {
            if (zadati.indexOf(element) > -1) {
                vrati.push(false);
                zadati.splice(zadati.indexOf(element), 1);
            }
        })
    }
return vrati;
};

export default Dugmad;