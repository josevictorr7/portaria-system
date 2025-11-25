function CardDetails ({title, info}) {

    return(
        <div className="border-b-1 border-b-gray-200 px-4 py-2">
        <p className="text-gray-500">{title}</p>
          <p className="font-bold">{info}</p>

        </div>
    )
    
}

export default CardDetails