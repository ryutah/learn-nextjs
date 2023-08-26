"use client";

import { useState } from "react";
import { createUser } from "@/lib/firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await createUser(email, password);
    alert(`Welcome, ${user.email}`);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <table style={{ margin: "0 auto", textAlign: "left" }}>
          <tbody>
            <tr>
              <td>
                <label>Email</label>
              </td>
              <td>
                <input
                  type="email"
                  placeholder="xxxxxx@xxx.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input
                  type="password"
                  placeholder="xxxxxxxxxxxx"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <input style={{ width: "100%" }} type="submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
