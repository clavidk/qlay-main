import { FC, ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
    </div>
);

export default Container;
