function WishlistItem({ item, onRemove }) {
    return (
      <div className="border p-4 flex justify-between items-center">
        <p>{item}</p>
        <button onClick={onRemove} className="text-red-500 hover:text-red-600">
          Remove
        </button>
      </div>
    );
  }
  
  export default WishlistItem;