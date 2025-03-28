import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import BookCard from '../components/BookCard'; 

jest.mock('lucide-react', () => ({
  Star: ({ className, fill }: { className: string; fill: string }) => (
    <svg data-testid="star-icon" className={className} fill={fill} />
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ to, state, children }: { to: string; state: { data: any }; children: React.ReactNode }) => (
    <a href={to} data-state={JSON.stringify(state)} data-testid="nav-link">
      {children}
    </a>
  ),
}));

describe('BookCard', () => {
  const mockData = {
    discountPrice: 150,
    bookName: 'Test Book',
    title: 'Test Book Title',
    author: 'Test Author',
    rating: 4.5,
    price: 200,
    quantity: 10,
    cover: 'test-cover.jpg',
    _id: '123',
  };

  test('renders all book details correctly', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('by Test Author')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10)')).toBeInTheDocument();
    expect(screen.getByText('Rs. 150')).toBeInTheDocument();
    expect(screen.getByText('Rs.200')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'test-cover.jpg');
  });

  test('renders NavLink with correct to and state props', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    const navLink = screen.getByTestId('nav-link');
    expect(navLink).toHaveAttribute('href', '/bookpage/123');
    expect(navLink).toHaveAttribute('data-state', JSON.stringify({ data: mockData }));
  });

  test('applies correct classes to container div', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    const container = screen.getByText('Test Book').parentElement!.parentElement!;
    expect(container).toHaveClass(
      'h-[275px]',
      'w-[235px]',
      'border',
      'border-[#E2E2E2]',
      'rounded-[3px]',
      'hover:shadow-2xl',
      'transition-all',
      'duration-300',
      'hover:border-[#C0C0C0]',
      'max-[500px]:w-[175px]'
    );
  });

  test('renders cover image with correct dimensions', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img', { name: '' });
    expect(image).toHaveClass('h-[135px]', 'w-[105px]');
    expect(image.parentElement).toHaveClass('h-[171px]', 'w-[100%]', 'bg-[#F5F5F5]', 'flex', 'justify-center', 'items-center');
  });

  test('displays rating and quantity with correct styling', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    const ratingDiv = screen.getByText('4.5').parentElement!;
    expect(ratingDiv).toHaveClass('flex', 'items-center', 'justify-center', 'gap-[5px]', 'bg-[#388E3C]', 'rounded-[1px]', 'w-[33px]', 'h-[16px]', 'text-white');

    const star = screen.getByTestId('star-icon');
    expect(star).toHaveClass('w-[9px]', 'h-[9px]');
    expect(star).toHaveAttribute('fill', 'white');

    const quantity = screen.getByText('(10)');
    expect(quantity).toHaveClass('text-[#878787]', 'text-[10px]');
  });

  test('displays prices with correct formatting', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} />
      </MemoryRouter>
    );

    const discountPrice = screen.getByText('Rs. 150');
    expect(discountPrice).toHaveClass('12px', 'font-medium');

    const originalPrice = screen.getByText('Rs.200');
    expect(originalPrice).toHaveClass('line-through', 'text-[#878787]', 'text-[10px]', '!mt-[4px]');
  });

  test('renders without crashing when cover image is missing', () => {
    const noCoverData = { ...mockData, cover: '' };
    render(
      <MemoryRouter>
        <BookCard data={noCoverData} />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    const img = screen.getByRole('img', { name: '' });
    const srcValue = img.getAttribute('src');
    expect([null, '']).toContain(srcValue);
  });
});