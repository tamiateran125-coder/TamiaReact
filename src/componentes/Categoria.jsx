function Categoria({titulo, children}) {
    return (

        <section className="bg bg-info p-5 rounded-lg m-3">
            <h3 className="border-bottom">{titulo}</h3>
            <div className="row">
                {children}
            </div>
            
        </section>
    );
}   

export default Categoria;
