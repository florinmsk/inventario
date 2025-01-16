"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Form,
  Divider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import logoImage from "@/assets/logo-dark.svg";

import { emailLogin, signInWithGoogle } from "../actions";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <a href="javascript:void(0)">
              <Image
                src={logoImage}
                priority={true}
                width={60}
                alt="logo"
                className="w-60 mb-8 mx-auto block"
              />
            </a>

            <div className="bg-neutral-900 border border-white/15 p-8 rounded-2xl shadow">
              <h2 className="text-white/90 text-center text-2xl font-bold">
                Sign in
              </h2>
              <Form
                className="flex flex-col gap-3 mt-8 space-y-4"
                validationBehavior="native"
              >
                <Input
                  isRequired
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  classNames={{
                    requiredIndicator: "hidden",
                    label: "!text-white",
                    input: [
                      "!text-white",
                      "!border-accent",
                      "!placeholder:text-gray-400",
                    ],
                    inputWrapper: ["!border-accent", "border-1"],
                  }}
                />
                <Input
                  isRequired
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-accent"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-accent"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={{
                    requiredIndicator: "hidden",
                    label: "!text-white",
                    input: [
                      "!text-white",
                      "!border-accent",
                      "!placeholder:text-gray-400",
                    ],
                    inputWrapper: ["!border-accent", "border-1"],
                  }}
                />
                <div className="flex w-full items-center justify-between px-1 py-2">
                  <Checkbox
                    name="remember"
                    size="sm"
                    classNames={{
                      label: "text-white",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link className="text-accent" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  className="w-full bg-gradient-to-tr from-primary to-accent text-white font-medium shadow-lg"
                  formAction={emailLogin}
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
              <div className="flex items-center gap-4 py-8">
                <Divider className="flex-1 bg-white/30" />
                <p className="shrink-0 text-tiny text-white/60">OR</p>
                <Divider className="flex-1 bg-white/30" />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  startContent={
                    <Icon icon="flat-color-icons:google" width={24} />
                  }
                  variant="bordered"
                  color="accent"
                  onPress={signInWithGoogle}
                >
                  Continue with Google
                </Button>
              </div>
              <p className="text-center text-large text-white mt-8">
                Need to create an account?&nbsp;
                <Link
                  href="/signup"
                  className="text-large text-accent hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
