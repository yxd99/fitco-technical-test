import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';

import { Paths } from '@app/lib/constants/paths';

export function LoginRegister() {
  return (
    <>
      <Link className="flex items-center" href={Paths.LOGIN}>
        <span>Login</span>
      </Link>
      <Separator orientation="vertical" />
      <Link className="flex items-center" href={Paths.REGISTER}>
        <span>Register</span>
      </Link>
    </>
  );
}
