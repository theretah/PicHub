import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Post } from "../../interfaces/Post";

const useSavedPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthor"],
    queryFn: () =>
      axios
        .get(`/api/post/getSavedPosts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });
};

export default useSavedPosts;
