import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiErrorWarningFill } from 'react-icons/ri';

export function Disclaimer({
	show,
	setShow,
}: {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setShow}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed z-10 inset-0 overflow-y-auto'>
					<div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
								<div>
									<div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100'>
										<RiErrorWarningFill
											className='h-6 w-6 text-yellow-600'
											aria-hidden='true'
										/>
									</div>
									<div className='mt-3 text-center sm:mt-5'>
										<Dialog.Title
											as='h3'
											className='text-lg leading-6 font-medium text-gray-900'>
											Disclaimer
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-sm text-gray-500'>
												While each of the movie has a director, it is important
												to remember that movies are made by teams rather than
												individuals.
											</p>
										</div>
									</div>
								</div>
								<div className='mt-5 sm:mt-6'>
									<button
										type='button'
										className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base text-white hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm'
										onClick={() => setShow(false)}>
										Okay !
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
