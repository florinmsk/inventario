'use client';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="py-24 overflow-x-clip">
            <div className="container max-w-5xl mx-auto relative">
                <div className="absolute -left-48 top-20 hidden lg:block">
                    <img src="assets/images/design-example-1.png" alt="Example 1 Image" />
                </div>
                <div className="absolute -right-48 -top-20 hidden lg:block">
                    <img src="assets/images/design-example-2.png" alt="Example 2 Image" />
                </div>
                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-gradient-to-tr btn-gradient rounded-full text-white/85 font-semibold text-lg text-center">✨ Empowering departments to thrive</div>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 text-pretty">
                    Smart Inventory, <br /> Better Control
                </h1>
                <p className="text-center text-xl text-white/60 mt-8 text-pretty max-w-3xl mx-auto">
                    Effortlessly manage and track your department&apos;s products with our intuitive SaaS solution, streamlining inventory and boosting operational efficiency.
                </p>
                <form className="flex flex-row items-center border border-white/25 rounded-full p-2 mt-8 max-w-lg mx-auto">
                    <input
                        autoComplete="off"
                        name="email"
                        type="email"
                        placeholder="Enter your email adress"
                        classNames={{
                            input: '!p-0 !m-0 !border-none !bg-transparent !text-inherit !px-4',
                            inputWrapper: '!p-0 !m-0 !border-none !bg-transparent',
                            innerWrapper: '!p-0 !m-0 !border-none !bg-transparent',
                        }}
                    />
                    <button type="submit" radius="full" size="md" className="bg-gradient-to-tr from-primary to-accent text-white shadow-lg whitespace-nowrap">
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
    );
}
