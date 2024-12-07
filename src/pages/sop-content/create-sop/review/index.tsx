import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import FormContainer from "@/components/form-container";
import { SOP } from "@/schemas/sop-content";
import { useFormContext } from "react-hook-form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    // register,
    // formState: { errors, isDirty },
  } = useFormContext<SOP>();

  const onSubmit = () => {
    // navigate("/sop-content/review");
    alert("Submitted");
  };

  return (
    <FormContainer
      id="sop-content-form"
      title="Review"
      className="bg-sidebar"
      // TODO: HANDLE IT LATER
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "SOPs Studio", url: "/sop-content" },
          { name: "Content", url: "." },
        ]}
        rightArea={
          <div className="flex items-center gap-4">
            <Button
              id="help-button"
              variant={"ghost"}
              // TODO : HANDLE IT LATER
              // onClick={startTour}
            >
              <MdHelpOutline className="w-5 h-auto" />
              <span className="text-muted-foreground">Need help?</span>
            </Button>
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              <BsArrowLeft className="w-4 h-auto fill-foreground" />
              Previous
            </Button>
            <Button
              id="next-button"
              isLoading={false}
              disabled={false}
              type="submit"
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                <BsArrowRight className="w-4 h-auto fill-background" />
              </div>
            </Button>
          </div>
        }
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ullam
      atque nesciunt esse alias incidunt eius placeat, voluptate officiis
      inventore consequatur quis consectetur velit assumenda illum autem
      recusandae animi architecto quos similique ipsam? Ducimus aspernatur
      incidunt sunt commodi veritatis, architecto laborum molestias neque vero
      quo dignissimos. Soluta, cum. Voluptatibus tempora alias doloremque,
      maiores illum ipsa, laboriosam mollitia provident sapiente eligendi nobis
      beatae unde ducimus et ipsam nostrum iste, natus molestias reiciendis
      culpa libero! Aspernatur voluptatibus id, assumenda accusantium possimus
      eos sapiente, esse quaerat maiores harum dolore minus rem, suscipit
      incidunt amet vero. Officiis placeat, reiciendis nostrum velit consequatur
      nisi labore iusto aliquid minima modi ipsam quam corrupti minus id harum
      sit? Fuga, saepe! In exercitationem recusandae vitae. Nisi quia quasi
      ipsam doloremque accusantium facere rerum, reprehenderit dolorem veniam
      obcaecati reiciendis pariatur eveniet natus velit numquam nobis quisquam
      fuga deleniti aliquam sapiente vero neque. Excepturi repellat hic ratione
      ex corrupti magni similique illum, sequi, quibusdam laborum architecto
      distinctio beatae consequatur a cupiditate qui asperiores? Delectus
      doloremque eius minus rem eveniet quam tenetur quod. Accusantium delectus
      odit optio? Error nobis, ad optio mollitia hic sunt cupiditate repudiandae
      consequuntur quia aut quaerat quibusdam voluptatibus! Voluptatum odio id
      quasi enim expedita architecto temporibus? Asperiores, eum? Ad earum
      corrupti exercitationem facere nisi in unde debitis dolorem odio.
      Distinctio expedita eos possimus soluta alias quod rem assumenda
      voluptatibus? Magnam, totam! Ipsa, quam saepe? Itaque ipsa nulla sequi
      porro eius asperiores ex necessitatibus ipsum, explicabo animi repellat
      incidunt libero doloribus repellendus distinctio debitis! Aut repudiandae
      unde accusantium facere error assumenda cupiditate ab quo deserunt
      architecto, aperiam praesentium tenetur amet iusto vitae voluptate nulla
      inventore fugiat, officia vel enim similique et, accusamus sunt? Magni
      ducimus sapiente, a distinctio, dolores repudiandae magnam, vero iste cum
      nemo unde suscipit facilis delectus hic provident reiciendis inventore
      rerum? Odit at est perferendis? Omnis quod qui accusamus consequuntur
      doloribus praesentium quaerat tempore iure eum animi tempora dicta harum
      placeat quas suscipit maxime dolorem, dolore ipsa officia aperiam!
      Provident odit dolor omnis fugit quam, voluptate tenetur. Reiciendis quae
      iste possimus optio dolores mollitia eum quidem facilis quaerat. Impedit
      sint voluptatibus magni, minima magnam laudantium rem aspernatur aut quos,
      ullam expedita officiis earum adipisci ut quo nobis! Eveniet debitis
      voluptatum sequi impedit, sed eos harum reprehenderit laborum totam quae
      suscipit unde voluptate consequuntur, laudantium, atque minima distinctio
      corporis iste? Assumenda expedita ad dolores eligendi porro ducimus nisi
      obcaecati perferendis, ipsum reiciendis eum maiores. Necessitatibus,
      accusamus. Corporis laboriosam quo eos iste rerum sint deleniti voluptate
      minima numquam? Veritatis, ratione! At quas consectetur consequuntur nulla
      eum saepe dignissimos delectus labore facilis voluptate corrupti soluta
      magni consequatur quaerat sint a impedit, rerum, illo, excepturi quod
      eaque officia officiis molestias dolorem! Ab assumenda quisquam veniam,
      suscipit doloremque incidunt fuga. Impedit numquam qui commodi, officiis
      accusantium eaque aliquam harum ut cum magni neque aut quo optio
      voluptates architecto veniam officia, fuga aperiam. Incidunt architecto
      quod omnis officia quae nesciunt vitae atque esse quasi officiis repellat
      aspernatur doloribus, ratione facere perferendis id neque eligendi fugit
      consequuntur placeat optio dolorem delectus deleniti. Reprehenderit maxime
      quidem accusantium totam voluptatum a. Vitae suscipit mollitia, tempore
      quas exercitationem sapiente animi rerum corporis recusandae quia
      repudiandae ipsum reiciendis temporibus! Dolorem in corporis asperiores
      voluptatum, ad amet dolorum exercitationem quia excepturi nostrum, animi
      accusantium aspernatur architecto similique minus necessitatibus illo
      repellat quod molestiae voluptates quidem impedit culpa deleniti. Neque
      aliquid delectus ratione nesciunt. Consectetur dolor, iusto aliquid optio
      in sint quibusdam velit repellendus voluptates possimus ex, amet
      reiciendis eius sapiente laborum nam adipisci et qui eum commodi quod
      delectus? Atque voluptatum necessitatibus, ex temporibus expedita porro,
      adipisci perferendis neque distinctio ab explicabo, dolores vitae quia
      ipsum odio unde eveniet qui asperiores et eius repellat minima repellendus
      aut at! Sint reiciendis tempore sequi dolor placeat, id, magnam asperiores
      perspiciatis deserunt quas dolore omnis laboriosam voluptates delectus
      dolorum, ad autem? Assumenda nam ab quasi perferendis ad provident labore
      dignissimos vitae iste aliquam eos commodi, repudiandae laudantium,
      quibusdam, fuga possimus accusantium repellat temporibus quod asperiores
      sint neque soluta numquam! Nihil inventore voluptates provident non sed,
      commodi autem minus perferendis ullam ex architecto alias sit quidem.
      Ipsum, totam. Facilis asperiores doloremque eius rerum facere veritatis
      quam repudiandae est provident? Ex nam velit ea magni, voluptatum
      accusantium dolore excepturi inventore, hic distinctio quidem ab. Magni
      eveniet, dicta voluptatem quos facilis aperiam error? Dicta dolorem, nulla
      minus officia sed ducimus repellat delectus, reiciendis rem nobis
      dignissimos exercitationem, voluptatem quibusdam? Voluptates ut quasi
      placeat id, officiis quae nobis nam inventore veritatis error, minus
      facere a delectus ea nemo est eaque commodi facilis beatae nesciunt
      distinctio! Explicabo magni rem architecto maiores eum, ipsa voluptas
      dolorum quaerat quas commodi, velit dolor! Velit tempora saepe quis
      corporis. Totam, facere. Ducimus similique cumque unde debitis et
      perferendis hic minus optio neque, sapiente iste magni minima libero
      officiis ratione odio voluptates ullam suscipit vero, in nesciunt.
      Recusandae labore voluptas, corrupti nemo architecto sit? Delectus
      dignissimos iusto ab? Voluptate corporis necessitatibus nobis provident,
      reiciendis quos assumenda nisi quam eum deleniti! Vero omnis dicta ex quas
      perferendis, iusto possimus ad, officia quibusdam corrupti nulla! Itaque
      eveniet asperiores nemo eum reprehenderit provident ut maxime, ducimus
      nobis suscipit, iure repellendus velit fugit voluptates earum laudantium
      voluptatibus aut natus, quos officia minima doloremque quibusdam! Nam
      exercitationem temporibus nobis voluptatum veniam molestias alias voluptas
      culpa est, sit commodi maiores iusto amet eaque libero. Fugit facilis,
      aliquid impedit accusamus voluptatem veritatis a ratione quod eveniet
      temporibus, odio alias fugiat maxime ducimus? Voluptatem illum accusamus
      nostrum nesciunt, voluptas ut temporibus. Tempore quis, totam velit non
      quisquam placeat porro cumque enim deleniti saepe unde ducimus sit
      cupiditate necessitatibus sed aperiam blanditiis facilis veritatis
      asperiores quod numquam pariatur fugit. Reiciendis maxime eaque id rem,
      ipsa doloremque explicabo reprehenderit iste tempora est optio cupiditate
      eos laborum corporis voluptatem asperiores laboriosam assumenda officiis
      dolores eius esse distinctio cum? Itaque, quia mollitia eum, voluptate
      aliquam nemo tenetur soluta iste rem, ipsum labore quos nisi odio.
      Accusantium nostrum facilis blanditiis veritatis dolor temporibus
      consectetur earum doloribus cumque eum culpa inventore illo delectus eaque
      repellendus eos, quas magnam ullam saepe eligendi. Porro, asperiores aut.
    </FormContainer>
  );
};

export default Review;
