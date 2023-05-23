import { FC, ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black">
        {children}
    </div>
);

export default Container;
