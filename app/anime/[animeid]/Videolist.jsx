"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { FaChevronDown } from "react-icons/fa"; // Import the icon
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Videolist = () => {
  return (
    <div className="w-1/5 bg-r h-[70vh] space-y-3 space-x-3 ">
      <h1 className="text-white ml-3 ">List of episodes:</h1>
      <div className="flex space-x-4 ">
        <Input
          id="exampleInput"
          type="text"
          className="w-32 h-8 custom-input text-white"
          placeholder="Number of Ep"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white h-3 flex">
            EPS:001-100
            <FaChevronDown className="ml-2 mt-1" /> {/* Add the icon here */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => alert("Action 1")}>
              001-100
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Action 2")}>
              100-200
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => alert("Action 3")}>
              200-300
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Videolist;
