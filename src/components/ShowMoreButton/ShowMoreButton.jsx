import './ShowMoreButton.scss'

export default function ShowMoreButton({
    onClick,
}) {
    return (
        <button className="button-more" onClick={onClick}>
            Show more
        </button>
    );
}
