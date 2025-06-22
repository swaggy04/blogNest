
import { BounceButton } from '../components/ui/bounce-button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ViewAllArticlesButton() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent default link navigation
    if (isSignedIn) {
      router.push('/articles');
    } else {
      router.push('/sign-up'); // or '/sign-in' if preferred
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center py-5 bg-gradient-to-t from-blue-50 dark:from-gray-950">
      <BounceButton variant="default" size="sm" onClick={handleClick}>
        <span>View All Articles</span>
      </BounceButton>
    </div>
  );
}
