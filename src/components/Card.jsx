import "../index.css"
function Card({ title, content, imgSrc }) {
    return (<div className="bg-gray-50 rounded-xl shadow-md m-4 mb-1 p-5 pl-10 pr-10
    p-6 border border-grey-200 hover:shadow-xl transition">
        <div className="flex  items-center gap-3">
            <img className="w-20 h-20 mb-3 object-contain opacity-80" src={imgSrc} alt={`${title} imgage`} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed text-justify">{content}</p>
    </div>);
}
export default Card;