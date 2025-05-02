import { Link } from "react-router-dom";
import { MessageSquareIcon, UserX2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { unfriendUser } from "../lib/api";
import { getLanguageFlag } from "../utils/languageUtils";

const FriendCard = ({ friend, showUnfriend = true }) => {
  const queryClient = useQueryClient();

  const { mutate: unfriendMutation, isPending: isUnfriending } = useMutation({
    mutationFn: unfriendUser,
    onSuccess: () => {
      // Tampilkan toast dengan styling yang lebih baik
      toast.success(`${friend.fullName} telah dihapus dari daftar teman`, {
        duration: 4000,
        position: "top-center",
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      // Invalidate queries untuk memperbarui UI
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus teman", {
        duration: 4000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const handleUnfriend = () => {
    // Gunakan toast untuk konfirmasi yang lebih baik
    toast(
      (t) => (
        <div className="p-2">
          <p className="font-medium mb-2">Hapus teman?</p>
          <p className="text-sm mb-4">
            Apakah Anda yakin ingin menghapus <b>{friend.fullName}</b> dari
            daftar teman?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => toast.dismiss(t.id)}
            >
              Batal
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => {
                unfriendMutation(friend._id);
                toast.dismiss(t.id);
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
          maxWidth: "320px",
        },
      }
    );
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-normal p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/chat/${friend._id}`}
            className="btn btn-outline flex items-center flex-1"
            data-tip="Kirim pesan"
          >
            <MessageSquareIcon className="size-4 mr-1" />
            Message
          </Link>

          {showUnfriend && (
            <div className="tooltip tooltip-top" data-tip="Unfriend">
              <button
                className="btn btn-outline btn-error flex-1"
                onClick={handleUnfriend}
                disabled={isUnfriending}
              >
                {isUnfriending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <UserX2Icon className="size-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
