import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document';

type Props = DocumentInitialProps & { nonce: string };

const MyDocument = (props: Props) => {
  const { nonce } = props;

  return (
    <Html className="h-full">
      <Head nonce={nonce} />
      <body className="h-full">
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps & { nonce: string }> => {
  const initialProps = await Document.getInitialProps(ctx);

  const nonce = ctx.req?.headers?.['x-nonce'] as string;

  return {
    ...initialProps,
    nonce,
  };
};

export default MyDocument;
