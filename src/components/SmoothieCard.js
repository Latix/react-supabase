
const SmoothieCard = ({ smoothie, handleDelete }) => {
    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="smoothie-rating">{smoothie.rating}</div>
            <p onClick={() => handleDelete(smoothie.id)}>Delete</p>
        </div>
    );
}

export default SmoothieCard;