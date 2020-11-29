import React from 'react';
import './Description.css';


const Description = () =>(
    <section className="container">
        <div className="title">
            <div>
                <h2 className="sub-title">O que é o EmFormal?</h2>
            </div>
            <div>
                <p className="lead">
                    A plataforma EmFormal busca encontrar o serviço espeficico para a sua necessidade,
                    entrando em contato diretamente com o prestador de serviço. Por aqui também será
                    possível anunciar gratuitamente os seus serviços!
                </p>
            </div>
        </div>
        {/* sub container - linha 1  */}
        <section className="container2">

            <div className="sub-container">           	
                <h3 className="subtitle">
                    Buscando por serviços
                </h3>
                
                <p className = "placeHolder">
                    Navegue pela plataforma para encontrar o que deseja. Possuimos filtros e categorias
                    para te ajudar e facilitar ainda mais a sua busca
                </p>       
            </div>

            <div className="sub-container">           	
                <h3 className="subtitle">
                    Negocie diretamente com prestador
                </h3>
                <p className = "placeHolder">
                    Converse diretamente com os profissionais, para negociarem melhor as datas e valores.
                </p>       
            </div>

            <div className="sub-container">           	
                <h3 className="subtitle">
                    Obtenha os orçamentos direto com os profissionais
                </h3> 
                <p className = "placeHolder">
                    Tenha vários orçamentos de diferentes profissionais, e avalie o que achar melhor de sua preferência.
                </p>       
            </div>

        </section>
        {/* sub container - linha 2  */}        
    </section>
)

export default Description


/**
 * 
 * 
 * <section className="container2">

            <div className="sub-container">           	
                <h3 className="subtitle">XXXXXXXXXX</h3>  
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>       
            </div>

            <div className="sub-container">           	
                <h3 className="subtitle">XXXXXXXXXX</h3>  
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>       
            </div>

            <div className="sub-container">           	
                <h3 className="subtitle">XXXXXXXXXX</h3>  
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>       
            </div>

        </section>
 * 
 * 
 * 
 */