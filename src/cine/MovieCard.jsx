import { useContext, useState } from "react";
import { toast } from "react-toastify";
import TagSvg from "../assets/tag.svg";
import { MovieContext } from "../context";
import MovieDetailsModal from "../MovieDetailsModal";
import { getImgUrl } from "../utils/cine-utility";
import Rating from "./Rating";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  function handleAddToCart(event, movie) {
    event.stopPropagation();
    const found = state.cartData.find((item) => {
      return item.id === movie.id;
    });
    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });

      toast.success(`Movie ${movie.title} is Added Successfully`, {
        position: "bottom-right",
      });
    } else {
      toast.error(`Movie ${movie.title} has been Added to the Cart Already!`, {
        positon: "bottom-right",
      });
    }
  }

  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }
  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal
          onClose={handleModalClose}
          movie={selectedMovie}
          onAddCart={handleAddToCart}
        />
      )}

      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt=""
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">I{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(event) => handleAddToCart(event, movie)}
            >
              <img src={TagSvg} alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
