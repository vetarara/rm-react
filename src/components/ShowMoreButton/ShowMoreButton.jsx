import './ShowMoreButton.scss'

export default function ShowMoreButton({
    onClick,
}) {
    return (
        <button className="button-more" type="button" onClick={onClick}>
            Show more
        </button>
    );
}
