
type MainComponentProps = {
  content: string;
  
};

export default function MainComponent({content}: MainComponentProps){

    

    switch (content) {

        case 'main': return (<>
            <div>MAIN</div>
        </>)

         case 'main2': return (<>
            <div>MAIN2</div>
        </>)
    }


}