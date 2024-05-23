"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { TUser } from "@/types/user";
import { dummyUser } from "@/app/page";

const SelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<string>();

  return (
    <div>
      <Select
        onValueChange={(user: string) => {
          setSelectedUser(user);
        }}
      >
        <SelectTrigger className="border-none shadow-none outline-none bg-muted rounded-full focus:outline-none max-w-24">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          {dummyUser.map((user: TUser) => (
            <SelectItem key={user.id} value={user.firstName}>
              {user.firstName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectUser;
