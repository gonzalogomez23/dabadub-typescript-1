import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReactNode, MouseEvent } from 'react';

interface AsideLinkProps extends NavLinkProps {
    children: ReactNode;
    className?: string;
  }

const AsideLink = ({ to, children, className = '', ...props }: AsideLinkProps) => {

    const isToValid = typeof to === 'string' && to !== '';
    
    return (
        <NavLink
            to={to}
            {...props}
            {...(!isToValid && { onClick: (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault() })}
            end // Ensures the link is only active when the URL matches exactly, preventing "All posts" from being active when a category is selected
        >
            {({ isActive }) => (
                <div
                    className={`${className} font-headings hover:bg-secondary/5 rounded-md transition-all font-medium text-lg flex items-center gap-4 px-4 py-3 ${isActive && to && 'text-primary'} ${!to && 'text-gray-500 opacity-50 cursor-default hover:bg-transparent'}`}
                >
                    <div className='flex items-center gap-3'>
                        {isActive &&  isToValid && <div className='h-6 w-0.5 bg-primary rounded-full'></div>}
                        {children}
                    </div>
                </div>
            )}
        </NavLink>
    );
};

export default AsideLink;
